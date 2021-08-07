import React, { useState } from "react";
import { View } from "react-native";

import { AirbnbRating } from "react-native-ratings";

function Starscounter() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <AirbnbRating
        count={5}
        reviews={["", "", "", "", ""]}
        defaultRating={3}
        size={35}
        selectedColor={"#FE816C"}
        unSelectedColor={"rgba(254, 129, 108, 0.3)"}
        reviewColor={"#FE816C"}
      />
    </View>
  );
}

export default Starscounter;
