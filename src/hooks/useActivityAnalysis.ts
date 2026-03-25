import { useMemo } from 'react';
import { useIkigai } from '../context/IkigaiContext';
import { Activity } from '../types';

export const useActivityAnalysis = () => {
  const { activities } = useIkigai();

  return useMemo(() => {
    // strict intersections
    const ikigai = activities.filter(a => a.love && a.skill && a.need && a.pay);
    const passion = activities.filter(a => a.love && a.skill);
    const mission = activities.filter(a => a.love && a.need);
    const profession = activities.filter(a => a.skill && a.pay);
    const vocation = activities.filter(a => a.need && a.pay);

    // strict only-one categories
    const hobbies = activities.filter(a => a.love && !a.skill && !a.need && !a.pay); // "Love only"
    const skills = activities.filter(a => !a.love && a.skill && !a.need && !a.pay); // "Skill only"
    const causes = activities.filter(a => !a.love && !a.skill && a.need && !a.pay); // "Need only" (Causes)
    const jobs = activities.filter(a => !a.love && !a.skill && !a.need && a.pay); // "Pay only" (Jobs)

    return {
      ikigai,
      passion,
      mission,
      profession,
      vocation,
      hobbies,
      skills,
      causes,
      jobs,
      activities // return raw list just in case
    };
  }, [activities]);
};
