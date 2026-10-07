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

    // strict only-one categories + opposites
    const hobbies = activities.filter(a => a.love && !a.skill && !a.need); // "Love only" + "Love & Pay"
    const skills = activities.filter(a => !a.love && a.skill && !a.pay); // "Skill only" + "Skill & Need"
    const causes = activities.filter(a => !a.love && !a.pay && a.need); // "Need only" + "Skill & Need"
    const jobs = activities.filter(a => !a.skill && !a.need && a.pay); // "Pay only" + "Love & Pay"
    const uncategorized = activities.filter(a => !a.love && !a.skill && !a.need && !a.pay); // "None"

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
      uncategorized,
      activities // return raw list just in case
    };
  }, [activities]);
};
