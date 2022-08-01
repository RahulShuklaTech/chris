import React from 'react';
import * as PublicApi from '../apis/PublicApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import { ScreenContainer, WebView, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const ChathomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(async () => {
    try {
      if (!isFocused) {
        return;
      }
      const userJson = await PublicApi.gETUserGET(Constants, {
        user_id: Constants['USER_ID'],
      });
      setGlobalVariableValue({
        key: 'USER_JSON',
        value: userJson,
      });
      const onboardingChatCompleted = userJson[0]['onboarding_chat_completed'];
      setGlobalVariableValue({
        key: 'USER_ONBOARDING_CHAT_COMPLETED',
        value: onboardingChatCompleted,
      });
      const userUuidVal = userJson[0]['user_uuid_val'];
      setGlobalVariableValue({
        key: 'USER_UUID_VAL',
        value: userUuidVal,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      style={[styles.screen, { backgroundColor: theme.colors.strongInverse }]}
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
      hasBottomSafeArea={false}
    >
      <>
        {!Constants['USER_ONBOARDING_CHAT_COMPLETED'] ? null : (
          <WebView
            style={styles.WebViewEN}
            source={{
              uri: `${Constants['CHATBOT_URL_MAIN']}?url_app_check=${Constants['CHATBOT_APP_CHECK_MAIN']}&url_user_id=994220765000168000&url_adalo_id=168&url_user_uuid=${Constants['USER_ID']}&url_user_uuid_val=${Constants['USER_UUID_VAL']}`,
            }}
          />
        )}
      </>
      <>
        {Constants['USER_ONBOARDING_CHAT_COMPLETED'] ? null : (
          <WebView
            style={styles.WebViewwf}
            source={{
              uri: `${Constants['CHATBOT_URL_ONBOARD']}?url_app_check=${Constants['CHATBOT_APP_CHECK_ONBOARD']}&url_user_id=994220765000168000&url_adalo_id=168&url_user_uuid=${Constants['USER_ID']}&url_user_uuid_val=${Constants['USER_UUID_VAL']}`,
            }}
          />
        )}
      </>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  WebViewEN: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  WebViewwf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  screen: {
    width: '100%',
    height: '100%',
  },
});

export default withTheme(ChathomeScreen);
