import React from 'react';
import * as AirtableSupportToDoListsApi from '../apis/AirtableSupportToDoListsApi.js';
import * as PublicApi from '../apis/PublicApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  Divider,
  Icon,
  IconButton,
  ScreenContainer,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const MainsupportScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  // Looks through the object array of completed support activities to determine if the step has been performed by the user
  const searchSupportChecked = (
    student_support_activity_step_id,
    student_support_activity_steps
  ) => {
    // student_support_activity_step_id - The Airtable record ID for this step
    // student_support_activity_steps - Returned value from API for all the steps the user has already completed for this activity

    // console.log(student_support_activity_step_id);

    let compare_id = student_support_activity_steps.filter(
      i =>
        i['student_support_activity_step_id'] ===
        student_support_activity_step_id
    ).length;

    //console.log(compare_id);
    return compare_id;
  };

  const { theme } = props;
  const { navigation } = props;

  const pOSTStudentSupportActivityStepPOST =
    PublicApi.usePOSTStudentSupportActivityStepPOST();
  const dELETEStudentSupportActivityStepDELETE =
    PublicApi.useDELETEStudentSupportActivityStepDELETE();

  const [
    student_support_activity_step_data,
    setStudent_support_activity_step_data,
  ] = React.useState([]);

  return (
    <ScreenContainer
      style={{ backgroundColor: theme.colors.strongInverse }}
      hasSafeArea={false}
      scrollable={true}
      hasTopSafeArea={false}
    >
      <View
        style={[styles.Viewll, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.View_16}>
          <View>
            <Text style={[styles.Textb6, { color: theme.colors.primary }]}>
              {props.route?.params?.support_name ?? 'Test name'}
            </Text>

            <Text style={[styles.Text_3k, { color: theme.colors.medium }]}>
              {props.route?.params?.support_label ?? 'Test label'}
            </Text>
          </View>
        </View>
        <Divider style={styles.DividerOI} color={theme.colors.secondary} />
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      <View style={[styles.ViewEq, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.ViewRY}>
          <Text style={[styles.Text_10, { color: theme.colors.medium }]}>
            {'Tasks'}
          </Text>

          <Text
            style={[
              styles.TextfF,
              {
                color: theme.colors.medium,
                textDecorationColor: theme.colors.success,
              },
            ]}
          >
            {'Select to see details'}
          </Text>
        </View>

        <View>
          <View>
            <PublicApi.FetchGETStudentSupportActivityStepsGET
              student_support_activity_id={
                props.route?.params?.student_support_activity_id ??
                'f50077d0-7dc3-4fba-917b-468df9f7a86a'
              }
              onData={fetchData => {
                try {
                  setStudent_support_activity_step_data(fetchData);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {({
                loading,
                error,
                data,
                refetchGETStudentSupportActivitySteps,
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

                return null;
              }}
            </PublicApi.FetchGETStudentSupportActivityStepsGET>
            <AirtableSupportToDoListsApi.FetchGETSupportTemplateStepsGET
              support_label_id={
                props.route?.params?.support_label_id ?? 'core_practices'
              }
            >
              {({ loading, error, data, refetchGETSupportTemplateSteps }) => {
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
                  <FlatList
                    data={fetchData?.records}
                    listKey={'bcRiuB3F'}
                    keyExtractor={({ item }) => item?.id || item?.uuid || item}
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          <>
                            {searchSupportChecked(
                              listData?.fields?.support_template_step_id,
                              student_support_activity_step_data
                            ) ? null : (
                              <View style={styles.ViewvI}>
                                <View style={styles.Viewih}>
                                  <IconButton
                                    onPress={async () => {
                                      try {
                                        await pOSTStudentSupportActivityStepPOST.mutateAsync(
                                          {
                                            details: listData?.fields?.details,
                                            label: listData?.fields?.label,
                                            order: listData?.fields?.order,
                                            student_support_activity:
                                              props.route?.params
                                                ?.student_support_activity_id ??
                                              'f50077d0-7dc3-4fba-917b-468df9f7a86a',
                                            student_support_activity_step_id:
                                              listData?.fields
                                                ?.support_template_step_id,
                                            user_id: Constants['USER_ID'],
                                          }
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                    size={32}
                                    icon={
                                      'MaterialCommunityIcons/checkbox-blank-outline'
                                    }
                                    color={theme.colors.primary}
                                  />
                                </View>

                                <View style={styles.ViewYv}>
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        navigation.navigate(
                                          'MainsupportdetailsScreen',
                                          {
                                            support_label_id:
                                              props.route?.params
                                                ?.support_label_id ??
                                              'core_practices',
                                            support_label:
                                              props.route?.params
                                                ?.support_label ?? 'Test label',
                                            support_name:
                                              props.route?.params
                                                ?.support_name ?? 'Test name',
                                            student_support_activity_id:
                                              props.route?.params
                                                ?.student_support_activity_id ??
                                              'f50077d0-7dc3-4fba-917b-468df9f7a86a',
                                            support_template_step_id:
                                              listData?.fields
                                                ?.support_template_step_id,
                                            support_step_label:
                                              listData?.fields?.label,
                                            support_step_details:
                                              listData?.fields?.details,
                                          }
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View style={styles.ViewbZ}>
                                      <View style={styles.ViewCv}>
                                        <Text
                                          style={[
                                            styles.TextAx,
                                            { color: theme.colors.strong },
                                          ]}
                                        >
                                          {listData?.fields?.label}
                                        </Text>

                                        <Text
                                          style={[
                                            theme.typography.caption,
                                            styles.TextsX,
                                            { color: theme.colors.medium },
                                          ]}
                                        >
                                          {listData?.fields?.details}
                                        </Text>
                                      </View>

                                      <View>
                                        <Icon
                                          size={24}
                                          color={theme.colors.success}
                                          name={'Feather/more-vertical'}
                                        />
                                      </View>
                                    </View>
                                  </Touchable>
                                </View>
                              </View>
                            )}
                          </>
                          <>
                            {!searchSupportChecked(
                              listData?.fields?.support_template_step_id,
                              student_support_activity_step_data
                            ) ? null : (
                              <View style={styles.ViewpJ}>
                                <View style={styles.View_7t}>
                                  <IconButton
                                    onPress={async () => {
                                      try {
                                        await dELETEStudentSupportActivityStepDELETE.mutateAsync(
                                          {
                                            student_support_activity_id:
                                              props.route?.params
                                                ?.student_support_activity_id ??
                                              'f50077d0-7dc3-4fba-917b-468df9f7a86a',
                                            student_support_activity_step_id:
                                              listData?.fields
                                                ?.support_template_step_id,
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

                                <View style={styles.Viewj4}>
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        navigation.navigate(
                                          'MainsupportdetailsScreen',
                                          {
                                            support_label_id:
                                              props.route?.params
                                                ?.support_label_id ??
                                              'core_practices',
                                            support_label:
                                              props.route?.params
                                                ?.support_label ?? 'Test label',
                                            support_name:
                                              props.route?.params
                                                ?.support_name ?? 'Test name',
                                            student_support_activity_id:
                                              props.route?.params
                                                ?.student_support_activity_id ??
                                              'f50077d0-7dc3-4fba-917b-468df9f7a86a',
                                            support_template_step_id:
                                              listData?.fields
                                                ?.support_template_step_id,
                                          }
                                        );
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View style={styles.View_0X}>
                                      <View style={styles.ViewoN}>
                                        <Text
                                          style={[
                                            styles.Textv7,
                                            { color: theme.colors.mediumLight },
                                          ]}
                                        >
                                          {listData?.fields?.label}
                                        </Text>

                                        <Text
                                          style={[
                                            theme.typography.caption,
                                            styles.TextVD,
                                            { color: theme.colors.mediumLight },
                                          ]}
                                        >
                                          {listData?.fields?.details}
                                        </Text>
                                      </View>

                                      <View>
                                        <Icon
                                          size={24}
                                          color={theme.colors.mediumLight}
                                          name={'Feather/more-vertical'}
                                        />
                                      </View>
                                    </View>
                                  </Touchable>
                                </View>
                              </View>
                            )}
                          </>
                          <Divider
                            style={styles.Divider_0C}
                            color={theme.colors.mediumLight}
                          />
                        </>
                      );
                    }}
                    numColumns={1}
                  />
                );
              }}
            </AirtableSupportToDoListsApi.FetchGETSupportTemplateStepsGET>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Textb6: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 28,
  },
  Text_3k: {
    fontFamily: 'Roboto_400Regular',
  },
  View_16: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    alignContent: 'flex-end',
    paddingBottom: 6,
  },
  DividerOI: {
    height: 4,
    width: '10%',
  },
  Viewll: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  Text_10: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  TextfF: {
    fontFamily: 'Roboto_400Regular',
    textTransform: 'none',
    textDecorationLine: 'underline',
  },
  ViewRY: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  FetchzB: {
    minHeight: 40,
  },
  Viewih: {
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    marginRight: 14,
  },
  TextAx: {
    fontFamily: 'Roboto_400Regular',
    flexShrink: 1,
    fontSize: 16,
  },
  TextsX: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 4,
  },
  ViewCv: {
    alignItems: 'flex-start',
    marginRight: 8,
    flex: 1,
  },
  ViewbZ: {
    flexDirection: 'row',
  },
  ViewYv: {
    flex: 1,
  },
  ViewvI: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  View_7t: {
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    marginRight: 14,
  },
  Textv7: {
    fontFamily: 'Roboto_400Regular',
    flexShrink: 1,
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  TextVD: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 4,
    textDecorationLine: 'line-through',
  },
  ViewoN: {
    alignItems: 'flex-start',
    marginRight: 8,
    flex: 1,
  },
  View_0X: {
    flexDirection: 'row',
  },
  Viewj4: {
    flex: 1,
  },
  ViewpJ: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  Divider_0C: {
    height: 1,
  },
  Fetchvb: {
    minHeight: 40,
  },
  ViewEq: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
  },
});

export default withTheme(MainsupportScreen);
