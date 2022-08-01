import React from 'react';
import * as PublicApi from '../apis/PublicApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import {
  Divider,
  IconButton,
  ScreenContainer,
  Spacer,
  Surface,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

const JourneyhomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

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
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      hasTopSafeArea={true}
      scrollable={true}
    >
      <View
        style={[styles.ViewLI, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.View_02}>
          <View>
            <Text style={[styles.Textv1, { color: theme.colors.primary }]}>
              {'Journey'}
            </Text>

            <Text style={[styles.TextN5, { color: theme.colors.medium }]}>
              {'Keep making progress!!!'}
            </Text>
          </View>
          <IconButton
            onPress={() => {
              try {
                navigation.navigate('BottomTabNavigator', {
                  screen: 'MainNavigator',
                  params: { screen: 'SettingsScreen' },
                });
              } catch (err) {
                console.error(err);
              }
            }}
            size={32}
            icon={'Feather/more-vertical'}
            color={theme.colors.success}
          />
        </View>
        <Divider style={styles.Divider_62} color={theme.colors.secondary} />
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      <View style={styles.ViewSF}>
        <Text style={[styles.TextYB, { color: theme.colors.medium }]}>
          {'Summary'}
        </Text>

        <Surface
          style={[
            styles.Surface_6O,
            { borderRadius: 8, borderColor: theme.colors.mediumLight },
          ]}
        >
          <View style={styles.ViewT5}>
            <Text style={styles.TextaO}>{'Newcomer'}</Text>
          </View>

          <View style={styles.Viewe4}>
            <View>
              <Text style={[styles.TextQ1, { color: theme.colors.strong }]}>
                {'5'}
              </Text>

              <Text style={[styles.Textpt, { color: theme.colors.strong }]}>
                {'Day streak'}
              </Text>
            </View>
          </View>

          <View style={styles.ViewfZ}>
            <View>
              <Text style={[styles.Textap, { color: theme.colors.strong }]}>
                {'0'}
              </Text>

              <Text style={[styles.TextiM, { color: theme.colors.strong }]}>
                {'Total sessions'}
              </Text>
            </View>
          </View>
        </Surface>
        <Spacer top={12} right={8} bottom={12} left={8} />
        <Text style={[styles.TextKZ, { color: theme.colors.medium }]}>
          {'Recent sessions'}
        </Text>

        <Surface
          style={[
            styles.SurfaceXP,
            { borderColor: theme.colors.mediumLight, borderRadius: 8 },
          ]}
        >
          <Utils.CustomCodeErrorBoundary>
            <CustomCode.CalendarComponent />
          </Utils.CustomCodeErrorBoundary>
        </Surface>
        <Spacer top={12} right={8} bottom={12} left={8} />
        <Spacer top={12} right={8} bottom={12} left={8} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Textv1: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 28,
  },
  TextN5: {
    fontFamily: 'Roboto_400Regular',
  },
  View_02: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    alignContent: 'flex-end',
    paddingBottom: 6,
  },
  Divider_62: {
    height: 4,
    width: '10%',
  },
  ViewLI: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  TextYB: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  TextaO: {
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
    fontSize: 18,
  },
  ViewT5: {
    flex: 1,
  },
  TextQ1: {
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
  },
  Textpt: {
    textAlign: 'center',
  },
  Viewe4: {
    flex: 1,
  },
  Textap: {
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold',
    fontSize: 24,
  },
  TextiM: {
    textAlign: 'center',
  },
  ViewfZ: {
    flex: 1,
  },
  Surface_6O: {
    minHeight: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 8,
  },
  TextKZ: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  SurfaceXP: {
    minHeight: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    marginTop: 8,
    paddingLeft: 8,
    paddingTop: 16,
    paddingRight: 8,
    paddingBottom: 16,
  },
  TextRO: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  Surface_35: {
    minHeight: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    marginTop: 8,
    paddingLeft: 8,
    paddingTop: 16,
    paddingRight: 8,
    paddingBottom: 16,
  },
  Textb3: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  SurfacexN: {
    minHeight: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    marginTop: 8,
    paddingLeft: 8,
    paddingTop: 16,
    paddingRight: 8,
    paddingBottom: 16,
  },
  ViewSF: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
  },
});

export default withTheme(JourneyhomeScreen);
