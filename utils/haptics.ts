import * as Haptics from "expo-haptics";

export const hapticFeedback = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};
