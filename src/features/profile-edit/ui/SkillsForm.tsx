import {
  addSkill,
  fetchAvailableSkills,
  fetchUserSkills,
  removeSkill,
  Skill,
  SWR_AVAILABLE_SKILLS_KEY,
  SWR_PROFILE_SKILLS_KEY
} from '@entities/profile';
import { EMPTY_ARR } from '@shared/defaults';
import { Button } from '@shared/ui';
import Combobox from '@shared/ui/Combobox';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface SkillsFormProps {
  userId: string;
  onCancel: () => void;
  onSave: (skills: readonly Skill[]) => void;
}

const SkillsForm = ({ userId, onCancel, onSave }: SkillsFormProps) => {
  const { data: availableSkills } = useSWR(SWR_AVAILABLE_SKILLS_KEY, () =>
    fetchAvailableSkills()
  );

  const { data: userSkills = EMPTY_ARR } = useSWR(
    [SWR_PROFILE_SKILLS_KEY, userId],
    ([_, userId]) => fetchUserSkills(userId)
  );

  const { trigger: saveSkill } = useSWRMutation(
    [SWR_PROFILE_SKILLS_KEY, userId],
    ([_, userId], { arg }: { arg: { skillId: string } }) =>
      addSkill(userId, arg.skillId)
  );

  const { trigger: deleteSkill } = useSWRMutation(
    [SWR_PROFILE_SKILLS_KEY, userId],
    ([_, userId], { arg }: { arg: { skillId: string } }) =>
      removeSkill(userId, arg.skillId)
  );

  const onSkillSelect = (skillId: string) => {
    saveSkill({ skillId });
  };

  return (
    <div className="col-span-8 flex flex-col rounded-xl bg-primary">
      <div className="p-6">
        <div className="max-w-md">
          <Combobox
            placeholder="e.g. type “Product Design” and press enter"
            options={availableSkills}
            onChange={onSkillSelect}
          />
        </div>
      </div>
      <div className="flex flex-col divide-y divide-dark-300 border-y border-y-dark-300 px-6">
        {userSkills.map((skill, idx) => (
          <div key={idx} className="flex justify-between py-4">
            <span className="text-label-semibold">{skill.title}</span>
            <button
              className="text-caption text-light-300"
              onClick={() => {
                deleteSkill({ skillId: skill.id });
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-1 justify-between p-6">
        <Button title="Cancel" variant="secondary" onClick={onCancel} />
        <Button title="Save" onClick={() => onSave(userSkills)} />
      </div>
    </div>
  );
};

export default SkillsForm;
