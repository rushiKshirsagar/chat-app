import { StyleSheet, View } from "react-native";
import ChatGptContainer from "./src/ChatGptContainer";

export default function App() {
  return <ChatGptContainer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
