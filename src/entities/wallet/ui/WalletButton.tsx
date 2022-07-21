import {
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

const WalletButton = () => {
  return (
    <WalletModalProvider>
      <WalletMultiButton />
    </WalletModalProvider>
  );
};

export default WalletButton;
