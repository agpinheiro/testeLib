import LottieView from "lottie-react-native";

interface LottieProps {
  uri: string;
  loop?: boolean
}

export default function Lottie({uri, loop = true}: LottieProps) {
  return (
    <LottieView
      source={uri}
      style={{width: "100%", height: "100%"}}
      autoPlay
      loop={loop}
    />
  );
}