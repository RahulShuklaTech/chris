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
      <View style={styles.View_4G}>
        <View style={styles.Views6}>
          <View>
            <Text style={[styles.Text_1U, { color: theme.colors.primary }]}>
              {'StudyBot'}
            </Text>

            <Text style={[styles.TextVi, { color: theme.colors.medium }]}>
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
        <Divider style={styles.Divider_9X} color={theme.colors.secondary} />
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      <View
        style={[styles.ViewiV, { backgroundColor: theme.colors.background }]}
      >
        <View>
          <>
            {Constants['USER_CHECKIN_DAY_COMPLETED_LATEST'] ===
            getTodayString() ? null : (
              <View>
                <Text style={[styles.Text_1d, { color: theme.colors.medium }]}>
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
                      styles.SurfacevP,
                      {
                        borderRadius: 8,
                        borderColor: theme.colors.mediumLight,
                      },
                    ]}
                    elevation={3}
                  >
                    <View style={styles.ViewSY}>
                      <View style={styles.ViewsG}>
                        <CircleImage
                          style={styles.CircleImageuJ}
                          size={60}
                          source={{
                            uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/session-check-in.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3Nlc3Npb24tY2hlY2staW4ucG5nIiwiaWF0IjoxNjU4NTE3NjEyLCJleHAiOjE5NzM4Nzc2MTJ9.KxHt95mXPgjALzBvSmwOcI9hXPqgP6HO7ST8sKGUdEI&t=2022-07-22T19%3A20%3A12.058Z',
                          }}
                        />
                      </View>

                      <View style={styles.ViewCm}>
                        <Text
                          style={[
                            styles.TextQS,
                            { color: theme.colors.strong },
                          ]}
                        >
                          {'Check-in'}
                        </Text>

                        <Text
                          style={[
                            theme.typography.caption,
                            styles.Text_8E,
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
                            styles.TextbP,
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
                            styles.SurfaceaZ,
                            {
                              borderColor: theme.colors.mediumLight,
                              borderRadius: 8,
                            },
                          ]}
                        >
                          <FlatList
                            data={fetchData}
                            listKey={'Zxha8VGf'}
                            keyExtractor={({ item }) =>
                              item?.id || item?.uuid || item
                            }
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <View style={styles.Viewux}>
                                  <View style={styles.ViewMV}>
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

                                  <View style={styles.Viewlt}>
                                    <Touchable>
                                      <View style={styles.ViewO2}>
                                        <View style={styles.ViewV4}>
                                          <Text
                                            style={[
                                              styles.Textwc,
                                              { color: theme.colors.strong },
                                            ]}
                                          >
                                            {listData?.action_detail}
                                          </Text>

                                          <Text
                                            style={[
                                              theme.typography.caption,
                                              styles.TextfV,
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
                            styles.Text_4V,
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
                            styles.Surface_8W,
                            {
                              borderColor: theme.colors.mediumLight,
                              borderRadius: 8,
                            },
                          ]}
                        >
                          <FlatList
                            data={fetchData}
                            listKey={'ibG5eHfA'}
                            keyExtractor={({ item }) =>
                              item?.id || item?.uuid || item
                            }
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <View style={styles.Viewz2}>
                                  <View style={styles.ViewQR}></View>

                                  <View style={styles.ViewUM}>
                                    <Touchable
                                      onPress={() => {
                                        try {
                                          navigation.navigate(
                                            'MainsupportScreen',
                                            {
                                              support_label_id:
                                                listData?.support_label_id,
                                              student_support_activity_id:
                                                listData?.id,
                                              support_name: listData?.name,
                                              support_label: listData?.label,
                                            }
                                          );
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                    >
                                      <View style={styles.ViewuD}>
                                        <View style={styles.ViewWT}>
                                          <Text
                                            style={[
                                              styles.TextJ6,
                                              { color: theme.colors.strong },
                                            ]}
                                          >
                                            {listData?.name}
                                          </Text>

                                          <Text
                                            style={[
                                              theme.typography.caption,
                                              styles.TextqV,
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
        <Divider style={styles.DividerRe} color={theme.colors.secondary} />
        <View style={styles.ViewWR}>
          <View>
            <Text style={[styles.TextWD, { color: theme.colors.mediumLight }]}>
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
                  styles.ViewYM,
                  {
                    borderRadius: 8,
                    backgroundColor: theme.colors.light,
                    borderColor: theme.colors.divider,
                  },
                ]}
              >
                <View style={styles.ViewsL}>
                  <View style={styles.VieweV}>
                    <CircleImage
                      style={styles.CircleImageeW}
                      size={60}
                      source={{
                        uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/session-support-bw.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3Nlc3Npb24tc3VwcG9ydC1idy5wbmciLCJpYXQiOjE2NTg2MDgwMzQsImV4cCI6MTk3Mzk2ODAzNH0.-wDTmskdecB8g0sinn-dZGNwckuAkn1kRbCjdqwnFzQ',
                      }}
                    />
                  </View>

                  <View style={styles.ViewQQ}>
                    <Text
                      style={[styles.TextHU, { color: theme.colors.medium }]}
                    >
                      {'Support'}
                    </Text>

                    <Text
                      style={[
                        theme.typography.caption,
                        styles.Text_9H,
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
                  styles.Viewqb,
                  {
                    borderRadius: 8,
                    backgroundColor: theme.colors.light,
                    borderColor: theme.colors.divider,
                  },
                ]}
              >
                <View style={styles.ViewvO}>
                  <View style={styles.ViewTP}>
                    <CircleImage
                      style={styles.CircleImagepS}
                      size={60}
                      source={{
                        uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/session-focus-bw.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3Nlc3Npb24tZm9jdXMtYncucG5nIiwiaWF0IjoxNjU4NjA4ODY2LCJleHAiOjE5NzM5Njg4NjZ9.FaORMgTxxCo07Tp4VZGcWTK1YZTJoySjHnRSihx9W7Y',
                      }}
                    />
                  </View>

                  <View style={styles.ViewGj}>
                    <Text
                      style={[styles.TextYE, { color: theme.colors.medium }]}
                    >
                      {'Focus'}
                    </Text>

                    <Text
                      style={[
                        theme.typography.caption,
                        styles.TextAM,
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
                  styles.Viewlx,
                  {
                    borderRadius: 8,
                    backgroundColor: theme.colors.light,
                    borderColor: theme.colors.divider,
                  },
                ]}
              >
                <View style={styles.View_5Y}>
                  <View style={styles.View_7K}>
                    <CircleImage
                      style={styles.CircleImage_9H}
                      size={60}
                      source={{
                        uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/session-weekly-planning-bw.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3Nlc3Npb24td2Vla2x5LXBsYW5uaW5nLWJ3LnBuZyIsImlhdCI6MTY1ODYwODg0NCwiZXhwIjoxOTczOTY4ODQ0fQ.sGTJCNIUeeMZOYmTCUCUQJ_dRBL9ylQfuXFX0krnYuk',
                      }}
                    />
                  </View>

                  <View style={styles.ViewI6}>
                    <Text
                      style={[styles.TextUF, { color: theme.colors.medium }]}
                    >
                      {'Weekly planning'}
                    </Text>

                    <Text
                      style={[
                        theme.typography.caption,
                        styles.Texte9,
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
                            styles.TextzG,
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
                            styles.SurfaceZK,
                            {
                              borderColor: theme.colors.mediumLight,
                              borderRadius: 8,
                            },
                          ]}
                        >
                          <FlatList
                            data={fetchData}
                            listKey={'t9R3is54'}
                            keyExtractor={({ item }) =>
                              item?.id || item?.uuid || item
                            }
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <View style={styles.ViewCL}>
                                  <View style={styles.Viewns}>
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

                                  <View style={styles.View_19}>
                                    <Touchable>
                                      <View style={styles.Viewei}>
                                        <View style={styles.ViewSp}>
                                          <Text
                                            style={[
                                              styles.Text_12,
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
                                              styles.TexteO,
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
  Text_1U: {
    fontSize: 28,
    fontFamily: 'Roboto_700Bold',
  },
  TextVi: {
    fontFamily: 'Roboto_400Regular',
  },
  Views6: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 6,
    paddingTop: 20,
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  Divider_9X: {
    height: 4,
    width: '10%',
  },
  View_4G: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Text_1d: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_500Medium',
  },
  CircleImageuJ: {
    width: 40,
    height: 40,
  },
  ViewsG: {
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    minWidth: 32,
    maxWidth: 32,
    maxHeight: 32,
    minHeight: 32,
  },
  TextQS: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
  },
  Text_8E: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
  },
  ViewCm: {
    alignItems: 'flex-start',
    marginRight: 24,
  },
  ViewSY: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  SurfacevP: {
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
  TextbP: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_500Medium',
  },
  ViewMV: {
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    justifyContent: 'space-around',
    marginRight: 14,
  },
  Textwc: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    flexShrink: 1,
    flex: 1,
  },
  TextfV: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
  },
  ViewV4: {
    marginRight: 8,
    flexShrink: 1,
    alignItems: 'flex-start',
    flex: 1,
  },
  ViewO2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  Viewlt: {
    flex: 1,
  },
  Viewux: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
  },
  SurfaceaZ: {
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
  FetchD2: {
    minHeight: 40,
  },
  Text_4V: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_500Medium',
  },
  ViewQR: {
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    justifyContent: 'space-around',
    marginRight: 14,
  },
  TextJ6: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    flexShrink: 1,
    flex: 1,
  },
  TextqV: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
  },
  ViewWT: {
    marginRight: 8,
    flexShrink: 1,
    alignItems: 'flex-start',
    flex: 1,
  },
  ViewuD: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ViewUM: {
    flex: 1,
  },
  Viewz2: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
  },
  Surface_8W: {
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
  Fetchin: {
    minHeight: 40,
  },
  DividerRe: {
    height: 2,
    marginBottom: 16,
    marginTop: 16,
  },
  TextWD: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto_400Regular',
  },
  CircleImageeW: {
    width: 40,
    height: 40,
  },
  VieweV: {
    marginRight: 14,
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextHU: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  Text_9H: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
  },
  ViewQQ: {
    alignItems: 'flex-start',
    marginRight: 24,
  },
  ViewsL: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  ViewYM: {
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
  CircleImagepS: {
    width: 40,
    height: 40,
  },
  ViewTP: {
    marginRight: 14,
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextYE: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  TextAM: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
  },
  ViewGj: {
    alignItems: 'flex-start',
    marginRight: 24,
  },
  ViewvO: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  Viewqb: {
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
  CircleImage_9H: {
    width: 40,
    height: 40,
  },
  View_7K: {
    marginRight: 14,
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextUF: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
  },
  Texte9: {
    fontFamily: 'Roboto_400Regular',
    paddingTop: 2,
  },
  ViewI6: {
    alignItems: 'flex-start',
    marginRight: 24,
  },
  View_5Y: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  Viewlx: {
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
  ViewWR: {
    paddingBottom: 16,
  },
  TextzG: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontFamily: 'Roboto_400Regular',
  },
  Viewns: {
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    justifyContent: 'space-around',
    marginRight: 14,
  },
  Text_12: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    flexShrink: 1,
    flex: 1,
    textDecorationLine: 'line-through',
  },
  TexteO: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
    textDecorationLine: 'line-through',
  },
  ViewSp: {
    marginRight: 8,
    flexShrink: 1,
    alignItems: 'flex-start',
    flex: 1,
  },
  Viewei: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  View_19: {
    flex: 1,
  },
  ViewCL: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
  },
  SurfaceZK: {
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
  Fetch_0R: {
    minHeight: 40,
  },
  ViewiV: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
});

export default withTheme(MainhomeScreen);
