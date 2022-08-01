import React from 'react';
import * as PublicApi from '../apis/PublicApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  CircleImage,
  Divider,
  Icon,
  IconButton,
  ScreenContainer,
  Spacer,
  Surface,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const MainhomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setGlobalVariableValue = GlobalVariables.useSetValue();
  // Returns today's date as a string
  const getTodayString = () => {
    return new Date().toISOString().slice(0, 10);
  };

  // Vibrate one time
  const vibrateOnce = () => {
    // Set for 200ms for Android
    // Fixed at 400ms for iOS
    Vibration.vibrate(200, false);
  };

  // Gets the name of the day of the week
  const getDayName = () => {
    // https://stackoverflow.com/questions/24998624/day-name-from-date-in-js

    var date = new Date();
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Takes an input date and determines if it matches today
  const compareTodayDate = inputDateString => {
    // https://stackoverflow.com/questions/8215556/how-to-check-if-input-date-is-equal-to-todays-date

    // Set inputDate as a date
    var inputDate = new Date(inputDateString).setHours(0, 0, 0, 0);

    // Get today's date
    var todaysDate = new Date().setHours(0, 0, 0, 0);

    console.log(inputDate);
    console.log(todaysDate);

    // call setHours to take the time out of the comparison
    let compareDates = inputDate == todaysDate;
    console.log(compareDates);

    return compareDates;
  };

  // Sets up API query for matching field on today
  const filterQueryToday = () => {
    // Creates string to be used in API
    // e.g., "eq.2022-07-25"

    return 'eq.' + new Date().toISOString().slice(0, 10);
  };

  // Sets up API query to EXCLUDE today
  const filterQueryNotToday = () => {
    // Creates string to be used in API
    // e.g., "ne.2022-07-25"

    return 'neq.' + new Date().toISOString().slice(0, 10);
  };

  const { theme } = props;
  const { navigation } = props;

  const pATCHUserSessionTypeSelectedPATCH =
    PublicApi.usePATCHUserSessionTypeSelectedPATCH();
  const pOSTStudentHabitEventPOST = PublicApi.usePOSTStudentHabitEventPOST();
  const pATCHStudentLessonHabitPATCH =
    PublicApi.usePATCHStudentLessonHabitPATCH();
  const dELETEStudentHabitEventDELETE =
    PublicApi.useDELETEStudentHabitEventDELETE();

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
      const userCheckinDayCompletedLatest =
        userJson[0]['checkin_day_completed_latest'];
      setGlobalVariableValue({
        key: 'USER_CHECKIN_DAY_COMPLETED_LATEST',
        value: userCheckinDayCompletedLatest,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.background }}
      scrollable={true}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      <View style={styles.ViewPk}>
        <View style={styles.ViewrI}>
          <View>
            <Text style={[styles.TextJZ, { color: theme.colors.primary }]}>
              {'StudyBot'}
            </Text>

            <Text style={[styles.TextqZ, { color: theme.colors.medium }]}>
              {getDayName()}
            </Text>
          </View>
          <IconButton
            onPress={() => {
              try {
                navigation.navigate('SettingsScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            size={32}
            color={theme.colors.success}
            icon={'Feather/more-vertical'}
          />
        </View>
        <Divider style={styles.Divider_96} color={theme.colors.secondary} />
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      <View
        style={[styles.Viewhf, { backgroundColor: theme.colors.background }]}
      >
        <View>
          <>
            {Constants['USER_CHECKIN_DAY_COMPLETED_LATEST'] ===
            getTodayString() ? null : (
              <View>
                <Text style={[styles.Textam, { color: theme.colors.medium }]}>
                  {"Today's sessions"}
                </Text>

                <Touchable
                  onPress={async () => {
                    try {
                      await pATCHUserSessionTypeSelectedPATCH.mutateAsync({
                        session_type_selected: 'checkin',
                        user_id: Constants['USER_ID'],
                      });
                      navigation.navigate('BottomTabNavigator', {
                        screen: 'ChathomeScreen',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Surface
                    style={[
                      styles.SurfaceHl,
                      {
                        borderRadius: 8,
                        borderColor: theme.colors.mediumLight,
                      },
                    ]}
                    elevation={3}
                  >
                    <View style={styles.View_1l}>
                      <View style={styles.View_15}>
                        <CircleImage
                          style={styles.CircleImageVE}
                          size={60}
                          source={{
                            uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/session-check-in.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3Nlc3Npb24tY2hlY2staW4ucG5nIiwiaWF0IjoxNjU4NTE3NjEyLCJleHAiOjE5NzM4Nzc2MTJ9.KxHt95mXPgjALzBvSmwOcI9hXPqgP6HO7ST8sKGUdEI&t=2022-07-22T19%3A20%3A12.058Z',
                          }}
                        />
                      </View>

                      <View style={styles.ViewUM}>
                        <Text
                          style={[
                            styles.TextNH,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {'Check-in'}
                        </Text>

                        <Text
                          style={[
                            theme.typography.caption,
                            styles.Textns,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {'Grow your learning abilities'}
                        </Text>
                      </View>
                    </View>
                    <Icon
                      size={24}
                      color={theme.colors.success}
                      name={'AntDesign/right'}
                    />
                  </Surface>
                </Touchable>
              </View>
            )}
          </>
        </View>
        <Spacer top={8} right={8} bottom={8} left={8} />
        <View>
          <View>
            <PublicApi.FetchGETStudentLessonHabitGET
              filterToday={filterQueryNotToday()}
              user_id={Constants['USER_ID']}
            >
              {({ loading, error, data, refetchGETStudentLessonHabit }) => {
                const fetchData = data;
                if (!fetchData || loading) {
                  return <ActivityIndicator />;
                }

                if (error) {
                  return (
                    <Text style={{ textAlign: 'center' }}>
                      There was a problem fetching this data
                    </Text>
                  );
                }

                return (
                  <>
                    <>
                      {!fetchData?.length ? null : (
                        <Text
                          style={[
                            styles.Text_3v,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {"Today's actions"}
                        </Text>
                      )}
                    </>
                    <>
                      {!fetchData?.length ? null : (
                        <Surface
                          style={[
                            styles.SurfaceIP,
                            {
                              borderColor: theme.colors.mediumLight,
                              borderRadius: 8,
                            },
                          ]}
                        >
                          <FlatList
                            data={fetchData}
                            listKey={'rD3XU3yz'}
                            keyExtractor={({ item }) =>
                              item?.id || item?.uuid || item
                            }
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <View style={styles.View_0b}>
                                  <View style={styles.ViewL2}>
                                    <IconButton
                                      onPress={async () => {
                                        try {
                                          await pOSTStudentHabitEventPOST.mutateAsync(
                                            {
                                              action: listData?.action_detail,
                                              habit_note: '',
                                              habit_step: listData?.habit_step,
                                              name: 'Completed event',
                                              student_lesson_habit_id:
                                                listData?.id,
                                            }
                                          );
                                          await pATCHStudentLessonHabitPATCH.mutateAsync(
                                            {
                                              habit_completed_latest_date:
                                                getTodayString(),
                                              habit_completed_previous_date:
                                                listData?.habit_completed_previous_date,
                                              habit_step_count:
                                                listData?.habit_step_count + 1,
                                              habit_total_count:
                                                listData?.habit_total_count + 1,
                                              student_lesson_habit_id:
                                                listData?.id,
                                            }
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                      size={32}
                                      icon={
                                        'MaterialIcons/check-box-outline-blank'
                                      }
                                      color={theme.colors.primary}
                                    />
                                  </View>

                                  <View style={styles.ViewpW}>
                                    <Touchable>
                                      <View style={styles.ViewX0}>
                                        <View style={styles.ViewyS}>
                                          <Text
                                            style={[
                                              styles.TextED,
                                              { color: theme.colors.strong },
                                            ]}
                                          >
                                            {listData?.action_detail}
                                          </Text>

                                          <Text
                                            style={[
                                              theme.typography.caption,
                                              styles.TextGI,
                                              { color: theme.colors.medium },
                                            ]}
                                          >
                                            {listData?.lesson_label}
                                          </Text>
                                        </View>
                                        <Icon
                                          size={24}
                                          color={theme.colors.success}
                                          name={'Feather/more-vertical'}
                                        />
                                      </View>
                                    </Touchable>
                                  </View>
                                </View>
                              );
                            }}
                            numColumns={1}
                          />
                        </Surface>
                      )}
                    </>
                  </>
                );
              }}
            </PublicApi.FetchGETStudentLessonHabitGET>
          </View>
        </View>
        <Spacer top={8} right={8} bottom={8} left={8} />
        <View>
          <View>
            <PublicApi.FetchGETStudentSupportActivitiesGET
              user_id={Constants['USER_ID']}
            >
              {({
                loading,
                error,
                data,
                refetchGETStudentSupportActivities,
              }) => {
                const fetchData = data;
                if (!fetchData || loading) {
                  return <ActivityIndicator />;
                }

                if (error) {
                  return (
                    <Text style={{ textAlign: 'center' }}>
                      There was a problem fetching this data
                    </Text>
                  );
                }

                return (
                  <>
                    <>
                      {!fetchData?.length ? null : (
                        <Text
                          style={[
                            styles.TextZ9,
                            { color: theme.colors.medium },
                          ]}
                        >
                          {'Ongoing support'}
                        </Text>
                      )}
                    </>
                    <>
                      {!fetchData?.length ? null : (
                        <Surface
                          style={[
                            styles.SurfaceSn,
                            {
                              borderColor: theme.colors.mediumLight,
                              borderRadius: 8,
                            },
                          ]}
                        >
                          <FlatList
                            data={fetchData}
                            listKey={'NwEG3dv1'}
                            keyExtractor={({ item }) =>
                              item?.id || item?.uuid || item
                            }
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <View style={styles.ViewiM}>
                                  <View style={styles.ViewPd}></View>

                                  <View style={styles.ViewNy}>
                                    <Touchable
                                      onPress={() => {
                                        try {
                                          navigation.navigate(
                                            'MainsupportScreen',
                                            {
                                              support_label_id:
                                                listData?.support_label_id,
                                              support_label: listData?.label,
                                              support_name: listData?.name,
                                              student_support_activity_id:
                                                listData?.id,
                                            }
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                    >
                                      <View style={styles.ViewrR}>
                                        <View style={styles.ViewyF}>
                                          <Text
                                            style={[
                                              styles.TextiD,
                                              { color: theme.colors.strong },
                                            ]}
                                          >
                                            {listData?.name}
                                          </Text>

                                          <Text
                                            style={[
                                              theme.typography.caption,
                                              styles.TexttH,
                                              { color: theme.colors.medium },
                                            ]}
                                          >
                                            {listData?.label}
                                          </Text>
                                        </View>
                                        <Icon
                                          size={24}
                                          color={theme.colors.success}
                                          name={'Feather/more-vertical'}
                                        />
                                      </View>
                                    </Touchable>
                                  </View>
                                </View>
                              );
                            }}
                            numColumns={1}
                          />
                        </Surface>
                      )}
                    </>
                  </>
                );
              }}
            </PublicApi.FetchGETStudentSupportActivitiesGET>
          </View>
        </View>
        <Divider style={styles.DividerfU} color={theme.colors.secondary} />
        <View style={styles.ViewWx}>
          <View>
            <Text style={[styles.TextMl, { color: theme.colors.mediumLight }]}>
              {'Other chat sessions'}
            </Text>

            <Touchable
              onPress={async () => {
                try {
                  await pATCHUserSessionTypeSelectedPATCH.mutateAsync({
                    session_type_selected: 'prep_session',
                    user_id: Constants['USER_ID'],
                  });
                  navigation.navigate('BottomTabNavigator', {
                    screen: 'ChathomeScreen',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <View
                style={[
                  styles.View_4s,
                  {
                    borderRadius: 8,
                    backgroundColor: theme.colors.light,
                    borderColor: theme.colors.divider,
                  },
                ]}
              >
                <View style={styles.ViewGb}>
                  <View style={styles.ViewoM}>
                    <CircleImage
                      style={styles.CircleImage_90}
                      size={60}
                      source={{
                        uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/session-support-bw.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3Nlc3Npb24tc3VwcG9ydC1idy5wbmciLCJpYXQiOjE2NTg2MDgwMzQsImV4cCI6MTk3Mzk2ODAzNH0.-wDTmskdecB8g0sinn-dZGNwckuAkn1kRbCjdqwnFzQ',
                      }}
                    />
                  </View>

                  <View style={styles.ViewgJ}>
                    <Text
                      style={[styles.TextKR, { color: theme.colors.medium }]}
                    >
                      {'Support'}
                    </Text>

                    <Text
                      style={[
                        theme.typography.caption,
                        styles.TextPD,
                        { color: theme.colors.medium },
                      ]}
                    >
                      {'Help get unstuck'}
                    </Text>
                  </View>
                </View>
                <Icon
                  size={24}
                  color={theme.colors.mediumLight}
                  name={'AntDesign/right'}
                />
              </View>
            </Touchable>

            <Touchable
              onPress={async () => {
                try {
                  await pATCHUserSessionTypeSelectedPATCH.mutateAsync({
                    session_type_selected: 'daily_focus_session',
                    user_id: Constants['USER_ID'],
                  });
                  navigation.navigate('ChathomeScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <View
                style={[
                  styles.ViewqT,
                  {
                    borderRadius: 8,
                    backgroundColor: theme.colors.light,
                    borderColor: theme.colors.divider,
                  },
                ]}
              >
                <View style={styles.ViewvY}>
                  <View style={styles.View_1u}>
                    <CircleImage
                      style={styles.CircleImageOQ}
                      size={60}
                      source={{
                        uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/session-focus-bw.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3Nlc3Npb24tZm9jdXMtYncucG5nIiwiaWF0IjoxNjU4NjA4ODY2LCJleHAiOjE5NzM5Njg4NjZ9.FaORMgTxxCo07Tp4VZGcWTK1YZTJoySjHnRSihx9W7Y',
                      }}
                    />
                  </View>

                  <View style={styles.ViewL4}>
                    <Text
                      style={[styles.TextJ3, { color: theme.colors.medium }]}
                    >
                      {'Focus'}
                    </Text>

                    <Text
                      style={[
                        theme.typography.caption,
                        styles.TextF2,
                        { color: theme.colors.medium },
                      ]}
                    >
                      {'Maximize your productivity'}
                    </Text>
                  </View>
                </View>
                <Icon
                  size={24}
                  name={'AntDesign/right'}
                  color={theme.colors.mediumLight}
                />
              </View>
            </Touchable>

            <Touchable
              onPress={async () => {
                try {
                  await pATCHUserSessionTypeSelectedPATCH.mutateAsync({
                    session_type_selected: 'weekly_planning_session',
                    user_id: Constants['USER_ID'],
                  });
                  navigation.navigate('BottomTabNavigator', {
                    screen: 'ChathomeScreen',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <View
                style={[
                  styles.ViewaL,
                  {
                    borderRadius: 8,
                    backgroundColor: theme.colors.light,
                    borderColor: theme.colors.divider,
                  },
                ]}
              >
                <View style={styles.Viewqh}>
                  <View style={styles.View_9Y}>
                    <CircleImage
                      style={styles.CircleImageRb}
                      size={60}
                      source={{
                        uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/session-weekly-planning-bw.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3Nlc3Npb24td2Vla2x5LXBsYW5uaW5nLWJ3LnBuZyIsImlhdCI6MTY1ODYwODg0NCwiZXhwIjoxOTczOTY4ODQ0fQ.sGTJCNIUeeMZOYmTCUCUQJ_dRBL9ylQfuXFX0krnYuk',
                      }}
                    />
                  </View>

                  <View style={styles.View_6z}>
                    <Text
                      style={[styles.TextAp, { color: theme.colors.medium }]}
                    >
                      {'Weekly planning'}
                    </Text>

                    <Text
                      style={[
                        theme.typography.caption,
                        styles.Texta5,
                        { color: theme.colors.medium },
                      ]}
                    >
                      {'Master your time management'}
                    </Text>
                  </View>
                </View>
                <Icon
                  size={24}
                  color={theme.colors.mediumLight}
                  name={'AntDesign/right'}
                />
              </View>
            </Touchable>
          </View>
        </View>

        <View>
          <View>
            <PublicApi.FetchGETStudentLessonHabitGET
              filterToday={filterQueryToday()}
              user_id={Constants['USER_ID']}
            >
              {({ loading, error, data, refetchGETStudentLessonHabit }) => {
                const fetchData = data;
                if (!fetchData || loading) {
                  return <ActivityIndicator />;
                }

                if (error) {
                  return (
                    <Text style={{ textAlign: 'center' }}>
                      There was a problem fetching this data
                    </Text>
                  );
                }

                return (
                  <>
                    <>
                      {!fetchData?.length ? null : (
                        <Text
                          style={[
                            styles.Texttr,
                            { color: theme.colors.mediumLight },
                          ]}
                        >
                          {'Completed actions!'}
                        </Text>
                      )}
                    </>
                    <>
                      {!fetchData?.length ? null : (
                        <Surface
                          style={[
                            styles.Surface_2l,
                            {
                              borderColor: theme.colors.mediumLight,
                              borderRadius: 8,
                            },
                          ]}
                        >
                          <FlatList
                            data={fetchData}
                            listKey={'X70HldXL'}
                            keyExtractor={({ item }) =>
                              item?.id || item?.uuid || item
                            }
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <View style={styles.ViewHG}>
                                  <View style={styles.ViewUe}>
                                    <IconButton
                                      onPress={async () => {
                                        try {
                                          await pATCHStudentLessonHabitPATCH.mutateAsync(
                                            {
                                              habit_completed_latest_date:
                                                listData?.habit_completed_previous_date,
                                              habit_completed_previous_date:
                                                listData?.habit_completed_previous_date,
                                              habit_step_count:
                                                listData?.habit_step_count - 1,
                                              habit_total_count:
                                                listData?.habit_total_count - 1,
                                              student_lesson_habit_id:
                                                listData?.id,
                                            }
                                          );
                                          await dELETEStudentHabitEventDELETE.mutateAsync(
                                            {
                                              habit_completed_date:
                                                getTodayString(),
                                              student_lesson_habit:
                                                listData?.id,
                                            }
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                      size={32}
                                      color={theme.colors.mediumLight}
                                      icon={
                                        'MaterialCommunityIcons/checkbox-marked'
                                      }
                                    />
                                  </View>

                                  <View style={styles.Viewan}>
                                    <Touchable>
                                      <View style={styles.View_54}>
                                        <View style={styles.ViewpY}>
                                          <Text
                                            style={[
                                              styles.TextQM,
                                              {
                                                color: theme.colors.mediumLight,
                                              },
                                            ]}
                                          >
                                            {listData?.action_detail}
                                          </Text>

                                          <Text
                                            style={[
                                              theme.typography.caption,
                                              styles.Textv0,
                                              {
                                                color: theme.colors.mediumLight,
                                              },
                                            ]}
                                          >
                                            {listData?.lesson_label}
                                          </Text>
                                        </View>
                                        <Icon
                                          size={24}
                                          color={theme.colors.mediumLight}
                                          name={'Feather/more-vertical'}
                                        />
                                      </View>
                                    </Touchable>
                                  </View>
                                </View>
                              );
                            }}
                            numColumns={1}
                          />
                        </Surface>
                      )}
                    </>
                  </>
                );
              }}
            </PublicApi.FetchGETStudentLessonHabitGET>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  TextJZ: {
    fontSize: 28,
    fontFamily: 'Roboto_700Bold',
  },
  TextqZ: {
    fontFamily: 'Roboto_400Regular',
  },
  ViewrI: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingTop: 20,
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  Divider_96: {
    height: 4,
    width: '10%',
  },
  ViewPk: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Textam: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_500Medium',
  },
  CircleImageVE: {
    width: 40,
    height: 40,
  },
  View_15: {
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    minWidth: 32,
    maxWidth: 32,
    maxHeight: 32,
    minHeight: 32,
  },
  TextNH: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
  },
  Textns: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
  },
  ViewUM: {
    alignItems: 'flex-start',
    marginRight: 24,
  },
  View_1l: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  SurfaceHl: {
    minHeight: 40,
    marginTop: 8,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    marginBottom: 8,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Text_3v: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_500Medium',
  },
  ViewL2: {
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    justifyContent: 'space-around',
    marginRight: 14,
  },
  TextED: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    flexShrink: 1,
    flex: 1,
  },
  TextGI: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
  },
  ViewyS: {
    marginRight: 8,
    flexShrink: 1,
    alignItems: 'flex-start',
    flex: 1,
  },
  ViewX0: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ViewpW: {
    flex: 1,
  },
  View_0b: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
  },
  SurfaceIP: {
    minHeight: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  Fetchwj: {
    minHeight: 40,
  },
  TextZ9: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_500Medium',
  },
  ViewPd: {
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    justifyContent: 'space-around',
    marginRight: 14,
  },
  TextiD: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    flexShrink: 1,
    flex: 1,
  },
  TexttH: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
  },
  ViewyF: {
    marginRight: 8,
    flexShrink: 1,
    alignItems: 'flex-start',
    flex: 1,
  },
  ViewrR: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ViewNy: {
    flex: 1,
  },
  ViewiM: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
  },
  SurfaceSn: {
    minHeight: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  FetchPv: {
    minHeight: 40,
  },
  DividerfU: {
    height: 2,
    marginBottom: 16,
    marginTop: 16,
  },
  TextMl: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto_400Regular',
  },
  CircleImage_90: {
    width: 40,
    height: 40,
  },
  ViewoM: {
    marginRight: 14,
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextKR: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  TextPD: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
  },
  ViewgJ: {
    alignItems: 'flex-start',
    marginRight: 24,
  },
  ViewGb: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  View_4s: {
    paddingLeft: 16,
    flexDirection: 'row',
    marginTop: 4,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  CircleImageOQ: {
    width: 40,
    height: 40,
  },
  View_1u: {
    marginRight: 14,
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextJ3: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  TextF2: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
  },
  ViewL4: {
    alignItems: 'flex-start',
    marginRight: 24,
  },
  ViewvY: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  ViewqT: {
    paddingLeft: 16,
    flexDirection: 'row',
    marginTop: 4,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  CircleImageRb: {
    width: 40,
    height: 40,
  },
  View_9Y: {
    marginRight: 14,
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextAp: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  Texta5: {
    fontFamily: 'Roboto_400Regular',
    paddingTop: 2,
  },
  View_6z: {
    alignItems: 'flex-start',
    marginRight: 24,
  },
  Viewqh: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  ViewaL: {
    paddingLeft: 16,
    flexDirection: 'row',
    marginTop: 4,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  ViewWx: {
    paddingBottom: 16,
  },
  Texttr: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_400Regular',
  },
  ViewUe: {
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    justifyContent: 'space-around',
    marginRight: 14,
  },
  TextQM: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    flexShrink: 1,
    flex: 1,
    textDecorationLine: 'line-through',
  },
  Textv0: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
    textDecorationLine: 'line-through',
  },
  ViewpY: {
    marginRight: 8,
    flexShrink: 1,
    alignItems: 'flex-start',
    flex: 1,
  },
  View_54: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  Viewan: {
    flex: 1,
  },
  ViewHG: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
  },
  Surface_2l: {
    minHeight: 40,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  FetchaY: {
    minHeight: 40,
  },
  Viewhf: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
});

export default withTheme(MainhomeScreen);
