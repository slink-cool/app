import { User } from '@entities/user';
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
      <div className="p-6">
        <div className="max-w-xs">
          <TextInput
            id="skill-input"
            value={skill}
            onTextChange={setSkill}
            placeholder="e.g. type “Product Design” and press enter"
            onEnterPress={onSkillEnter}
          />
        </div>
      </div>
      <div className="flex flex-col divide-y divide-dark-300 border-y border-y-dark-300 px-6">
        {skills.map((skill, idx) => (
          <div key={idx} className="flex justify-between py-4">
            <span className="text-label-semibold">{skill}</span>
            <button
              className="text-caption text-light-300"
              onClick={() =>
                setSkills((prev) => prev.filter((it) => it !== skill))
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-1 justify-between p-6">
        <Button title="Cancel" variant="secondary" onClick={onCancel} />
        <Button title="Save" onClick={onSave} />
      </div>
    </div>
  );
};

export default SkillsForm;
