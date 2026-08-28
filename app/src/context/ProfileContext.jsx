import { createContext, useContext, useEffect, useState } from 'react';
import { getProfile, mediaUrl } from '../lib/strapi.js';
import portraitFallback from '../assets/images/portrait.jpg';
import communityFallback from '../assets/images/community.jpg';
import kigaliFallback from '../assets/images/kigali-dusk.jpg';

// Used until the CMS responds (or if it's unreachable) so the site always
// renders the same content it shipped with.
const FALLBACK_PROFILE = {
  heroEyebrow:
    'Peacebuilder · Public Health Advocate · Executive Director, Never Again Rwanda',
  heroTitleLine1: 'Dr. Joseph Ryarasa',
  heroTitleAccent: 'Nkurunziza',
  roles: ['Peacebuilder', 'Public Health Advocate', 'Human Rights Champion', 'Physician'],
  heroLede:
    'A medical doctor and public health practitioner who has bridged the gap between healthcare and social justice — applying clinical leadership to champion good governance, human rights, and accountability as essential pillars of a healthier public.',
  bridgeEyebrow: 'The Bridge',
  bridgeTitle: 'From treating the body to healing the body politic.',
  bridgeBody1:
    'Dr. Joseph Ryarasa Nkurunziza, MD, is a medical doctor, public health practitioner and social justice activist with over 15 years of experience. He earned his medical degree from the National University of Rwanda. His clinical career spanned HIV care and treatment — as an HIV clinician at the Rwanda Military Hospital, Clinical Service Director at Drew Cares International, and Clinical Services Specialist with the DoD HIV/AIDS Prevention Program and the US Embassy in Rwanda. He also served as Health Coordinator for the Millennium Village Project with the Earth Institute at Columbia University.',
  bridgeBody2:
    'He is the co-founder and Executive Director of Never Again Rwanda, a peacebuilding and social justice organization founded in 2002 in response to the 1994 Genocide against the Tutsi. He also serves as President of the African Democracy Forum, Chairperson of the Rwanda Civil Society Platform, and co-founder of the Health Development Initiative. Through this work he recognized that clinical care alone cannot fix health inequities without addressing underlying structural issues — and now champions good governance, human rights, and accountability as foundations of a healthier public.',
  ctaTitle: "Let's work together to move health and justice forward.",
  ctaSub: 'For collaboration, speaking engagements, media inquiries, or academic partnerships.',
  contactEmail: 'engagement@josephryarasa.rw',
  socialLinkedin: '',
  socialX: '',
  socialResearchGate: '',
  socialGoogleScholar: '',
  portraitUrl: portraitFallback,
  communityPhotoUrl: communityFallback,
  kigaliPhotoUrl: kigaliFallback,
};

const ProfileContext = createContext({ profile: FALLBACK_PROFILE, loading: true });

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(FALLBACK_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getProfile()
      .then((data) => {
        if (cancelled || !data) return;
        setProfile({
          ...FALLBACK_PROFILE,
          ...data,
          portraitUrl: mediaUrl(data.portrait) || portraitFallback,
          communityPhotoUrl: mediaUrl(data.communityPhoto) || communityFallback,
          kigaliPhotoUrl: mediaUrl(data.kigaliPhoto) || kigaliFallback,
        });
      })
      .catch(() => {
        // CMS unreachable — keep the fallback content, no error shown to visitors.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading }}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
