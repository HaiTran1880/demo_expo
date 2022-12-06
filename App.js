import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export default function App() {
  const [countdown, setCountdown] = useState(5);
  const [winner, setWinner] = useState("");
  const [games, setGames] = useState(0);

  const [playerChose, setPlayerChose] = useState("");

  useEffect(() => {
    if (countdown > 0 && playerChose != "") {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    }
  }, [playerChose, countdown]);

  useEffect(() => {
    setCountdown(5);
    setDeviceChose("");
    setWinner("");
  }, [games]);

  const [deviceChose, setDeviceChose] = useState("");

  useEffect(() => {
    if (countdown == 0) {
      // pick a random option
      var options = ["Búa", "Bao", "Kéo"],
        optionToUse = options[Math.floor(Math.random() * options.length)];

      setDeviceChose(optionToUse);
    }
  }, [countdown]);

  useEffect(() => {
    if (playerChose == deviceChose) {
      setWinner("Không phân thắng bại!");
      return;
    }
    if (playerChose === "Búa") {
      if (deviceChose === "Kéo") setWinner("Bạn!");
      else setWinner("Ko phải bạn!");
    }

    if (playerChose === "Bao") {
      if (deviceChose === "Búa") setWinner("Bạn!");
      else setWinner("Ko phải bạn!");
    }

    if (playerChose === "Kéo") {
      if (deviceChose === "Bao") setWinner("Bạn!");
      else setWinner("Ko phải bạn!");
    }
  }, [deviceChose]);

  return (
    <View style={styles.container}>
      <View style={styles.top_view}>
        <View style={styles.flex_center}>
          <Text style={styles.txt_24_white}>Đếm ngược: {countdown}</Text>
          {winner != "" && countdown == 0 && (
            <Text style={styles.txt_20_white}>
              {playerChose == deviceChose
                ? `  ${winner} `
                : ` Người chiến thắng: ${winner} 🎉`}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.center_view}>
        <Text style={[styles.txt_24_white, { marginBottom: 30 }]}>Chọn : </Text>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.flex_center}>
            <TouchableOpacity
              disabled={countdown != 0 && countdown != 5}
              onPress={() => {
                setPlayerChose("Búa");
                setGames(games + 1);
              }}
            >
              <View style={playerChose == "Búa" && styles.selected}>
                <Text style={styles.txt_24_blue}>✊Búa</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.flex_center}>
            <TouchableOpacity
              disabled={countdown != 0 && countdown != 5}
              onPress={() => {
                setPlayerChose("Bao");
                setGames(games + 1);
              }}
            >
              <View style={playerChose == "Bao" && styles.selected}>
                <Text style={styles.txt_24_blue}>✋Bao</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.flex_center}>
            <TouchableOpacity
              disabled={countdown != 0 && countdown != 5}
              onPress={() => {
                setPlayerChose("Kéo");
                setGames(games + 1);
              }}
            >
              <View style={playerChose == "Kéo" && styles.selected}>
                <Text style={styles.txt_24_blue}>✌️Kéo</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottom_view}>
        {deviceChose != "" && (
          <View style={styles.flex_center}>
            <Text style={[styles.txt_24_white, { marginBottom: 30 }]}>
              Đối thủ chọn:{" "}
            </Text>

            {deviceChose == "Búa" && (
              <Text style={styles.txt_24_white}>✊Búa</Text>
            )}
            {deviceChose == "Bao" && (
              <Text style={styles.txt_24_white}>✋Bao</Text>
            )}
            {deviceChose == "Kéo" && (
              <Text style={styles.txt_24_white}>✌️Kéo</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  top_view: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#6591C7",
    justifyContent: "center",
    alignItems: "center",
  },
  center_view: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: "#CBE1FB",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom_view: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: "#7FB7FA",
    justifyContent: "center",
    alignItems: "center",
  },
  flex_center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txt_24_white: {
    fontSize: 24,
    color: "white",
  },
  txt_20_white: {
    fontSize: 20,
    color: "white",
  },
  txt_24_blue: {
    fontSize: 24,
    color: "#6591C7",
  },
  selected: {
    borderWidth: 3,
    borderColor: "#6591C7",
    borderRadius: 10,
  },
});
