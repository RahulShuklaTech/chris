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
      <View style={styles.ViewrE}>
        <View
          style={[styles.Viewo8, { backgroundColor: theme.colors.secondary }]}
        >
          <Text style={[styles.Textik, { color: theme.colors.strong }]}>
            {'Settings'}
          </Text>
        </View>
      </View>

      <View style={styles.ViewaF}>
        <Touchable>
          <View style={styles.View_0J}>
            <View style={styles.ViewjW}>
              <Icon
                size={24}
                color={theme.colors.mediumLight}
                name={'Ionicons/person-circle-outline'}
              />
              <Text
                style={[styles.TextaT, { color: theme.colors.mediumLight }]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'Account Settings'}
              </Text>
            </View>

            <View style={styles.ViewJn}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.mediumLight}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.DividerwL}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable>
          <View style={styles.ViewGB}>
            <View style={styles.View_0m}>
              <Icon
                size={24}
                color={theme.colors.mediumLight}
                name={'Ionicons/notifications-outline'}
              />
              <Text
                style={[styles.Textzu, { color: theme.colors.mediumLight }]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'Notifications'}
              </Text>
            </View>

            <View style={styles.ViewJ7}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.mediumLight}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.Divider_7o}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable>
          <View style={styles.Viewgn}>
            <View style={styles.Viewy1}>
              <Icon
                size={24}
                color={theme.colors.mediumLight}
                name={'Ionicons/mail-outline'}
              />
              <Text
                style={[styles.Textg7, { color: theme.colors.mediumLight }]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'Support'}
              </Text>
            </View>

            <View style={styles.ViewB1}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.mediumLight}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.Divider_69}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>

        <Touchable>
          <View style={styles.ViewLE}>
            <View style={styles.ViewA8}>
              <Icon
                size={24}
                color={theme.colors.mediumLight}
                name={'Ionicons/help'}
              />
              <Text
                style={[styles.TextjS, { color: theme.colors.mediumLight }]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'FAQ'}
              </Text>
            </View>

            <View style={styles.ViewYX}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.mediumLight}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.DividerPz}
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
          <View style={styles.ViewtJ}>
            <View style={styles.ViewgU}>
              <Icon
                size={24}
                color={theme.colors.primary}
                name={'Ionicons/information-circle-outline'}
              />
              <Text
                style={[styles.TextEA, { color: theme.colors.strong }]}
                allowFontScaling={true}
                ellipsizeMode={'tail'}
                textBreakStrategy={'highQuality'}
              >
                {'About'}
              </Text>
            </View>

            <View style={styles.ViewiN}>
              <Icon
                name={'MaterialIcons/chevron-right'}
                color={theme.colors.success}
                size={24}
              />
            </View>
          </View>
          <Divider
            style={styles.Dividersv}
            height={1}
            color={theme.colors.divider}
          />
        </Touchable>
      </View>

      <View style={styles.Viewba}>
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
          <View style={styles.ViewZG}>
            <Text
              style={[
                styles.Textha,
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
  Textik: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Roboto_500Medium',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  Viewo8: {
    paddingLeft: 8,
    paddingBottom: 4,
    paddingRight: 8,
    paddingTop: 4,
    justifyContent: 'center',
  },
  ViewrE: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextaT: {
    marginLeft: 12,
    fontFamily: 'Roboto_400Regular',
  },
  ViewjW: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewJn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  View_0J: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  DividerwL: {
    height: 1,
  },
  Textzu: {
    marginLeft: 12,
    fontFamily: 'Roboto_400Regular',
  },
  View_0m: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewJ7: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewGB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  Divider_7o: {
    height: 1,
  },
  Textg7: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
  },
  Viewy1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewB1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Viewgn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  Divider_69: {
    height: 1,
  },
  TextjS: {
    marginLeft: 12,
    fontFamily: 'Roboto_400Regular',
  },
  ViewA8: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewYX: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewLE: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  DividerPz: {
    height: 1,
  },
  TextEA: {
    marginLeft: 12,
    fontFamily: 'Roboto_400Regular',
  },
  ViewgU: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewiN: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewtJ: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
  },
  Dividersv: {
    height: 1,
  },
  ViewaF: {
    flexGrow: 1,
    flexShrink: 0,
    marginLeft: 24,
    marginRight: 24,
  },
  Textha: {
    textAlign: 'center',
    fontSize: 18,
    textDecorationLine: 'underline',
    fontFamily: 'Roboto_400Regular',
  },
  ViewZG: {
    flexGrow: 1,
    flexShrink: 0,
    minHeight: 54,
    justifyContent: 'center',
  },
  Viewba: {
    flexGrow: 1,
    flexShrink: 0,
  },
});

export default withTheme(SettingsScreen);
