import React from 'react';
import * as AuthApi from '../apis/AuthApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  ButtonSolid,
  Link,
  ScreenContainer,
  Spacer,
  withTheme,
} from '@draftbit/ui';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RegistrationScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [nameInputValue, setNameInputValue] = React.useState('');
  const [passwordInputValue, setPasswordInputValue] = React.useState('');

  return (
    <ScreenContainer hasTopSafeArea={false}>
      <ImageBackground
        style={styles.ImageBackground_5e}
        source={{
          uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/sign-in-background.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3NpZ24taW4tYmFja2dyb3VuZC5wbmciLCJpYXQiOjE2NTg1MTYxNDYsImV4cCI6MTk3Mzg3NjE0Nn0.PXhT0tOZzXQywIj6t0vw4UIZDHbNZlGlSxDqcDclyMw&t=2022-07-22T18%3A55%3A46.008Z',
        }}
        resizeMode={'cover'}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.KeyboardAwareScrollViewLcContent}
        >
          <View>
            <Text style={[styles.TextCb, { color: theme.colors.strong }]}>
              {'Welcome!'}
            </Text>

            <Text style={[styles.TextCh, { color: theme.colors.strong }]}>
              {'Create an account to get started'}
            </Text>
          </View>

          <View style={styles.ViewNf}>
            <Text style={[styles.TextkK, { color: theme.colors.error }]}>
              {null}
            </Text>
            <TextInput
              onChangeText={newNameInputValue => {
                try {
                  setNameInputValue(newNameInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInputl7,
                {
                  borderColor: theme.colors.divider,
                  backgroundColor: theme.colors.background,
                },
              ]}
              value={nameInputValue}
              placeholder={'Name'}
              autoCapitalize={'words'}
            />
            <Spacer top={12} right={8} bottom={12} left={8} />
            <TextInput
              onChangeText={newEmailInputValue => {
                try {
                  setEmailInputValue(newEmailInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInputBq,
                {
                  borderColor: theme.colors.divider,
                  backgroundColor: theme.colors.background,
                },
              ]}
              value={emailInputValue}
              placeholder={'Email'}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
            />
            <Spacer top={12} right={8} bottom={8} left={8} />
            <TextInput
              onChangeText={newPasswordInputValue => {
                try {
                  setPasswordInputValue(newPasswordInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInputMi,
                {
                  borderColor: theme.colors.divider,
                  backgroundColor: theme.colors.background,
                },
              ]}
              value={passwordInputValue}
              placeholder={'Password'}
              secureTextEntry={true}
              autoCapitalize={'none'}
              textContentType={'password'}
            />
            <Spacer top={24} right={8} bottom={24} left={8} />
            <ButtonSolid
              onPress={async () => {
                try {
                  const signupResponseJson = await AuthApi.signupPOST(
                    Constants,
                    {
                      signupEmail: emailInputValue,
                      signupPassword: passwordInputValue,
                    }
                  );
                  const message = signupResponseJson.msg;
                  setGlobalVariableValue({
                    key: 'ERROR_MESSAGE',
                    value: message,
                  });
                  if (message) {
                    return;
                  }
                  navigation.navigate('AuthNavigator', {
                    screen: 'LoginScreen',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.ButtonSolidCW,
                { backgroundColor: theme.colors.primary },
              ]}
              title={'Sign up'}
            />
            <Spacer top={16} right={8} bottom={16} left={8} />
            <View style={styles.ViewRb}>
              <Text
                style={[
                  styles.Text_18,
                  {
                    color: theme.colors.strong,
                    textDecorationColor: theme.colors.strong,
                  },
                ]}
              >
                {'Have an account?'}
              </Text>
              <Spacer top={8} right={2} bottom={8} left={2} />
              <Link
                onPress={() => {
                  try {
                    navigation.navigate('LoginScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.Linkv4,
                  {
                    color: theme.colors.primary,
                    textDecorationColor: theme.colors.secondary,
                  },
                ]}
                title={'Sign in.'}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  TextCb: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'System',
    fontWeight: '600',
  },
  TextCh: {
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: '400',
    marginTop: 4,
  },
  TextkK: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  TextInputl7: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
  },
  TextInputBq: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
  },
  TextInputMi: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
  },
  ButtonSolidCW: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
  },
  Text_18: {
    marginRight: 2,
  },
  Linkv4: {
    textDecorationLine: 'underline',
    fontFamily: 'System',
    fontWeight: '600',
  },
  ViewRb: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ViewNf: {
    paddingLeft: 36,
    paddingRight: 36,
    marginTop: 24,
  },
  KeyboardAwareScrollViewLcContent: {
    justifyContent: 'center',
    flex: 1,
  },
  ImageBackground_5e: {
    height: '100%',
  },
});

export default withTheme(RegistrationScreen);
