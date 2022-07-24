import { UserInfo } from '@entities/user';
import { Button, TextInput } from '@shared/ui';
import { useState } from 'react';

interface SkillsFormProps {
  onCancel: () => void;
  onSave: () => void;
}

const SkillsForm = ({ onCancel, onSave }: SkillsFormProps) => {
  const [skills, setSkills] = useState<string[]>([]);

  const [skill, setSkill] = useState('');

  const onSkillEnter = () => {
    setSkills((prev) => [...prev, skill]);
    setSkill('');
  };

  return (
    <div className="col-span-8 flex flex-col overflow-hidden rounded-xl bg-primary">
      <div className="border-b border-b-dark-300 p-6">
        <div className="mb-6 max-w-xs">
          <TextInput
            id="skill-input"
            value={skill}
            onTextChange={setSkill}
            placeholder="enter skill"
            onEnterPress={onSkillEnter}
          />
        </div>
      </div>
      <div className="flex flex-col divide-y divide-dark-300 border-y border-dark-300 px-6 text-sm font-semibold">
        {skills.map((skill, idx) => (
          <div key={idx} className="py-4">
            {skill}
          </div>
        ))}
      </div>
      <div className="flex flex-1 justify-between p-6">
        <Button title="Cancel" kind="secondary" onClick={onCancel} />
        <Button title="Save" onClick={onSave} />
      </div>
    </div>
  );
};

export default SkillsForm;
