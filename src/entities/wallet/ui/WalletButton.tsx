import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

const WalletButton = () => {
  return (
    <WalletModalProvider>
      <WalletMultiButton className="!w-full !bg-secondary" />
    </WalletModalProvider>
  );
};

export default WalletButton;
