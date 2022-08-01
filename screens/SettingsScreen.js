import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  Divider,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View } from 'react-native';

const SettingsScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  return (
    <ScreenContainer scrollable={false} hasSafeArea={false}>
      <View style={styles.ViewwG}>
        <View
          style={[styles.ViewfB, { backgroundColor: theme.colors.secondary }]}
        >
          <Text style={[styles.TextFB, { color: theme.colors.strong }]}>
            {'Settings'}
          </Text>
        </View>
      </View>

      <View style={styles.Viewf9}>
        <Touchable>
          <View style={styles.Viewbv}>
            <View style={styles.ViewO0}>
              <Icon
                size={24}
                color={theme.colors.mediumLight}
                name={'Ionicons/person-circle-outline'}
              />
              <Text
                style={[styles.TextGd, { color: theme.colors.mediumLight }]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'Account Settings'}
              </Text>
            </View>

            <View style={styles.ViewG2}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.mediumLight}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.Dividera7}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable>
          <View style={styles.View_2K}>
            <View style={styles.Viewg9}>
              <Icon
                size={24}
                color={theme.colors.mediumLight}
                name={'Ionicons/notifications-outline'}
              />
              <Text
                style={[styles.TextFo, { color: theme.colors.mediumLight }]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'Notifications'}
              </Text>
            </View>

            <View style={styles.ViewkA}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.mediumLight}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.DividerrA}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable>
          <View style={styles.View_3C}>
            <View style={styles.ViewkX}>
              <Icon
                size={24}
                color={theme.colors.mediumLight}
                name={'Ionicons/mail-outline'}
              />
              <Text
                style={[styles.Textkg, { color: theme.colors.mediumLight }]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'Support'}
              </Text>
            </View>

            <View style={styles.Viewrw}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.mediumLight}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.DividervG}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable>
          <View style={styles.View_4z}>
            <View style={styles.ViewcF}>
              <Icon
                size={24}
                color={theme.colors.mediumLight}
                name={'Ionicons/help'}
              />
              <Text
                style={[styles.Textg9, { color: theme.colors.mediumLight }]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'FAQ'}
              </Text>
            </View>

            <View style={styles.Viewpe}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.mediumLight}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.Divider_51}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable
          onPress={async () => {
            try {
              await WebBrowser.openBrowserAsync('https://www.studybot.io');
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View style={styles.ViewH8}>
            <View style={styles.ViewJP}>
              <Icon
                size={24}
                color={theme.colors.primary}
                name={'Ionicons/information-circle-outline'}
              />
              <Text
                style={[styles.Text_2Y, { color: theme.colors.strong }]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'About'}
              </Text>
            </View>

            <View style={styles.ViewVR}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.success}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.Divider_7i}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>
      </View>

      <View style={styles.Viewil}>
        <Touchable
          onPress={() => {
            try {
              setGlobalVariableValue({
                key: 'AUTHORIZATION_HEADER',
                value: '-',
              });
              setGlobalVariableValue({
                key: 'USER_JSON',
                value: [],
              });
              setGlobalVariableValue({
                key: 'USER_ID',
                value: '-',
              });
              setGlobalVariableValue({
                key: 'USER_UUID_VAL',
                value: '-',
              });
              navigation.navigate('AuthNavigator', { screen: 'WelcomeScreen' });
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <View style={styles.ViewN3}>
            <Text
              style={[
                styles.TextkJ,
                {
                  color: theme.colors.strong,
                  textDecorationColor: theme.colors.success,
                },
              ]}
            >
              {'Sign Out'}
            </Text>
          </View>
        </Touchable>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  TextFB: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Roboto_500Medium',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  ViewfB: {
    paddingLeft: 8,
    paddingBottom: 4,
    paddingRight: 8,
    paddingTop: 4,
    justifyContent: 'center',
  },
  ViewwG: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextGd: {
    marginLeft: 12,
    fontFamily: 'Roboto_400Regular',
  },
  ViewO0: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewG2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Viewbv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  Dividera7: {
    height: 1,
  },
  TextFo: {
    marginLeft: 12,
    fontFamily: 'Roboto_400Regular',
  },
  Viewg9: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewkA: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  View_2K: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  DividerrA: {
    height: 1,
  },
  Textkg: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  ViewkX: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Viewrw: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  View_3C: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  DividervG: {
    height: 1,
  },
  Textg9: {
    marginLeft: 12,
    fontFamily: 'Roboto_400Regular',
  },
  ViewcF: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Viewpe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  View_4z: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  Divider_51: {
    height: 1,
  },
  Text_2Y: {
    marginLeft: 12,
    fontFamily: 'Roboto_400Regular',
  },
  ViewJP: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewVR: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewH8: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  Divider_7i: {
    height: 1,
  },
  Viewf9: {
    flexGrow: 1,
    flexShrink: 0,
    marginLeft: 24,
    marginRight: 24,
  },
  TextkJ: {
    textAlign: 'center',
    fontSize: 18,
    textDecorationLine: 'underline',
    fontFamily: 'Roboto_400Regular',
  },
  ViewN3: {
    flexGrow: 1,
    flexShrink: 0,
    minHeight: 54,
    justifyContent: 'center',
  },
  Viewil: {
    flexGrow: 1,
    flexShrink: 0,
  },
});

export default withTheme(SettingsScreen);
