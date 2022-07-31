import { UserInfo } from '@entities/user';
import { Button, ButtonIcon, TextInput } from '@shared/ui';
import { PublicKey } from '@solana/web3.js';
import { useCallback, useState } from 'react';
import CameraIcon from '@shared/icons/Camera.svg';

interface IntroFormProps {
  userInfo: UserInfo | null;
  onCancel: () => void;
  onSave: (userInfo: UserInfo) => void;
}

const IntroForm = ({
  userInfo,
  onCancel,
  onSave: onSaveCallback,
}: IntroFormProps) => {
  const [displayName, setDisplayName] = useState<string>(
    userInfo?.displayName || ''
  );

  const [shortName, setShortName] = useState<string>(userInfo?.shortName || '');

  const onSave = () => {
    onSaveCallback({ displayName, shortName });
  };

  return (
    <div className="col-span-8 flex flex-col overflow-hidden rounded-xl bg-primary">
      <div className="h-44 bg-[#D3EDFF]">
        <div className="flex w-full justify-end p-4">
          <ButtonIcon>
            <CameraIcon />
          </ButtonIcon>
        </div>
      </div>
      <div className="border-b border-b-dark-300 px-6">
        <div className="-mt-16 mb-6">
          <div className="flex aspect-square w-32 items-center justify-center rounded-full border-4 border-[#201D24] bg-[#D3EDFF]">
            <ButtonIcon>
              <CameraIcon />
            </ButtonIcon>
          </div>
        </div>
        <div className="mb-6">
          <TextInput
            id="display-name"
            title="Display name"
            placeholder="Enter display name"
            value={displayName}
            onTextChange={setDisplayName}
          />
        </div>
        <div className="mb-6">
          <TextInput
            id="short-name"
            title="Short name"
            placeholder="e.g. @delink"
            value={shortName}
            onTextChange={setShortName}
          />
        </div>
      </div>
      <div className="flex flex-1 justify-between p-6">
        <Button title="Cancel" variant="secondary" onClick={onCancel} />
        <Button title="Save" onClick={onSave} />
      </div>
    </div>
  );
};

export default IntroForm;
