import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

interface FirebaseContextType {
  user: any | null;
  profile: any | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signUpWithEmail: (email: string, password: string, displayName: string, role: 'User' | 'Sales', recruiterEmail?: string) => Promise<any>;
  logout: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  profile: null,
  loading: true,
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  logout: async () => {},
});

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to load session
  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedSession = localStorage.getItem('fandom_aurora_session');
        if (savedSession) {
          const parsedUser = JSON.parse(savedSession);
          setUser(parsedUser);

          // Try to fetch profile from Supabase
          try {
            const { data: initialProfile, error } = await supabase
              .from('users')
              .select('*')
              .eq('userId', parsedUser.uid)
              .single();

            if (!error && initialProfile) {
              setProfile(initialProfile);
            } else {
              // Fallback to local profile or construct standard profile
              const localProfile = localStorage.getItem(`profile_${parsedUser.uid}`);
              if (localProfile) {
                setProfile(JSON.parse(localProfile));
              } else {
                const fallbackProfile = {
                  userId: parsedUser.uid,
                  email: parsedUser.email,
                  displayName: parsedUser.displayName || parsedUser.email.split('@')[0],
                  tier: parsedUser.email === 'new2020.jeonil@gmail.com' ? 'Legend Tier' : 'Basic',
                  role: parsedUser.email === 'new2020.jeonil@gmail.com' ? 'Admin' : 'User',
                  createdAt: new Date().toISOString()
                };
                setProfile(fallbackProfile);
              }
            }
          } catch (supaErr) {
            console.warn("Supabase profile fetch error, using fallback:", supaErr);
            const localProfile = localStorage.getItem(`profile_${parsedUser.uid}`);
            if (localProfile) {
              setProfile(JSON.parse(localProfile));
            }
          }
        }
      } catch (err) {
        console.error("Error loading session:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Find user in localStorage
      const localUsersStr = localStorage.getItem('fandom_aurora_users') || '[]';
      const localUsers = JSON.parse(localUsersStr);
      
      const matchedUser = localUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      
      let authenticatedUser: any = null;

      if (matchedUser) {
        authenticatedUser = {
          uid: matchedUser.uid,
          email: matchedUser.email,
          displayName: matchedUser.displayName,
        };
      } else {
        // Let's also check if user exists in Supabase users table
        try {
          const { data: supaUser, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email.toLowerCase())
            .single();

          if (!error && supaUser) {
            // For convenience, let them log in
            authenticatedUser = {
              uid: supaUser.userId || supaUser.id,
              email: supaUser.email,
              displayName: supaUser.displayName,
            };
          }
        } catch (e) {
          console.warn("Supabase check failed:", e);
        }
      }

      // If user is admin email, we can auto-create if not exists
      if (!authenticatedUser && email.toLowerCase() === 'new2020.jeonil@gmail.com') {
        const adminUid = 'admin-uid-12345';
        authenticatedUser = {
          uid: adminUid,
          email: 'new2020.jeonil@gmail.com',
          displayName: '전일미디어 관리자',
        };
        
        // Save to local users
        const updatedUsers = [...localUsers, {
          uid: adminUid,
          email: 'new2020.jeonil@gmail.com',
          password: password,
          displayName: '전일미디어 관리자'
        }];
        localStorage.setItem('fandom_aurora_users', JSON.stringify(updatedUsers));
      }

      if (!authenticatedUser) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }

      // Save session
      localStorage.setItem('fandom_aurora_session', JSON.stringify(authenticatedUser));
      setUser(authenticatedUser);

      // Fetch or build profile
      let userProfile: any = null;
      try {
        const { data: supaProfile, error } = await supabase
          .from('users')
          .select('*')
          .eq('userId', authenticatedUser.uid)
          .single();

        if (!error && supaProfile) {
          userProfile = supaProfile;
        }
      } catch (e) {
        console.warn("Error fetching Supabase profile on sign in:", e);
      }

      if (!userProfile) {
        const savedLocalProfile = localStorage.getItem(`profile_${authenticatedUser.uid}`);
        if (savedLocalProfile) {
          userProfile = JSON.parse(savedLocalProfile);
        } else {
          userProfile = {
            userId: authenticatedUser.uid,
            email: authenticatedUser.email,
            displayName: authenticatedUser.displayName,
            tier: authenticatedUser.email === 'new2020.jeonil@gmail.com' ? 'Legend Tier' : 'Basic',
            role: authenticatedUser.email === 'new2020.jeonil@gmail.com' ? 'Admin' : 'User',
            createdAt: new Date().toISOString()
          };
          localStorage.setItem(`profile_${authenticatedUser.uid}`, JSON.stringify(userProfile));
        }
      }

      // Sync admin status
      if (authenticatedUser.email === 'new2020.jeonil@gmail.com') {
        userProfile.role = 'Admin';
        userProfile.tier = 'Legend Tier';
        localStorage.setItem(`profile_${authenticatedUser.uid}`, JSON.stringify(userProfile));
      }

      setProfile(userProfile);
      return authenticatedUser;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string, role: 'User' | 'Sales', recruiterEmail?: string) => {
    setLoading(true);
    try {
      const localUsersStr = localStorage.getItem('fandom_aurora_users') || '[]';
      const localUsers = JSON.parse(localUsersStr);

      const exists = localUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        throw new Error('이미 사용 중인 이메일 주소입니다. 다른 이메일로 가입하시거나 로그인해 주세요.');
      }

      const uid = 'user_' + Math.random().toString(36).substr(2, 9);
      const newUser = {
        uid,
        email: email.toLowerCase(),
        password,
        displayName
      };

      // Save user to local list
      localStorage.setItem('fandom_aurora_users', JSON.stringify([...localUsers, newUser]));

      // Determine profile parameters
      const isDefaultAdmin = email.toLowerCase() === 'new2020.jeonil@gmail.com';
      const userRole = isDefaultAdmin ? 'Admin' : role;
      const userTier = isDefaultAdmin ? 'Legend Tier' : (role === 'Sales' ? 'Gold' : 'Basic');

      let ancestors: string[] = [];
      const recruiterEmailClean = recruiterEmail ? recruiterEmail.trim() : '';

      if (recruiterEmailClean) {
        try {
          const { data: recruiterData, error: recruiterError } = await supabase
            .from('users')
            .select('*')
            .eq('email', recruiterEmailClean)
            .single();

          if (!recruiterError && recruiterData) {
            ancestors = [recruiterEmailClean, ...(recruiterData.ancestors || [])];
          } else {
            ancestors = [recruiterEmailClean];
          }
        } catch (searchError) {
          console.error("Error looking up recruiter:", searchError);
          ancestors = [recruiterEmailClean];
        }
      }

      const profilePayload = {
        userId: uid,
        email: email.toLowerCase(),
        displayName: displayName,
        tier: userTier,
        role: userRole,
        referredByEmail: recruiterEmailClean,
        ancestors: ancestors,
        phoneNumber: '',
        createdAt: new Date().toISOString(),
      };

      // Save locally
      localStorage.setItem(`profile_${uid}`, JSON.stringify(profilePayload));

      // Attempt to save to Supabase
      try {
        const { error: supabaseError } = await supabase
          .from('users')
          .insert([profilePayload]);

        if (supabaseError) {
          console.warn("Supabase insertion failed, keeping in localStorage:", supabaseError);
        }
      } catch (err) {
        console.warn("Failed to sync profile to Supabase:", err);
      }

      // Automatically sign in
      const authenticatedUser = {
        uid,
        email: email.toLowerCase(),
        displayName
      };
      localStorage.setItem('fandom_aurora_session', JSON.stringify(authenticatedUser));
      setUser(authenticatedUser);
      setProfile(profilePayload);

      return authenticatedUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem('fandom_aurora_session');
    setUser(null);
    setProfile(null);
  };

  return (
    <FirebaseContext.Provider value={{ user, profile, loading, signInWithEmail, signUpWithEmail, logout }}>
      {children}
    </FirebaseContext.Provider>
  );
};
