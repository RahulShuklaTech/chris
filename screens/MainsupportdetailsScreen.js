import React from 'react';
import * as AirtableSupportToDoListsApi from '../apis/AirtableSupportToDoListsApi.js';
import * as PublicApi from '../apis/PublicApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  Divider,
  IconButton,
  ScreenContainer,
  Spacer,
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

const MainsupportdetailsScreen = props => {
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
        style={[styles.Viewmw, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.Viewcs}>
          <View>
            <Text style={[styles.TextgV, { color: theme.colors.primary }]}>
              {props.route?.params?.support_name ?? 'Test name'}
            </Text>

            <Text style={[styles.Textjb, { color: theme.colors.medium }]}>
              {props.route?.params?.support_label ?? 'Test label'}
            </Text>
          </View>
        </View>
        <Divider style={styles.Dividernv} color={theme.colors.secondary} />
      </View>
      <Spacer top={12} right={8} bottom={12} left={8} />
      <View style={[styles.View_18, { backgroundColor: theme.colors.surface }]}>
        <View
          style={[
            styles.ViewP5,
            {
              backgroundColor: theme.colors.light,
              borderColor: theme.colors.secondary,
            },
          ]}
        >
          <View style={styles.View_6u}>
            <View
              style={[
                styles.ViewH8,
                { backgroundColor: theme.colors.secondary },
              ]}
            >
              <Text style={[styles.TextiP, { color: theme.colors.strong }]}>
                {'Summary'}
              </Text>
            </View>
            <View />
          </View>

          <Text style={[styles.TextD6, { color: theme.colors.medium }]}>
            {props.route?.params?.support_step_label ??
              'Keep up with your notes'}
          </Text>

          <Text style={[styles.TextZF, { color: theme.colors.medium }]}>
            {props.route?.params?.support_step_details ??
              'Find a note taking system that works for you and stick with it'}
          </Text>
        </View>
        <Spacer top={8} right={8} bottom={8} left={8} />
        <View style={styles.ViewV0}>
          <Text style={[styles.TextiQ, { color: theme.colors.medium }]}>
            {'Details'}
          </Text>
        </View>

        <View>
          <View>
            <AirtableSupportToDoListsApi.FetchGETSupportTemplateStepDetailsGET
              support_template_step_id={
                props.route?.params?.support_template_step_id ??
                'rec5j9I2g6VoNyWts'
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
                refetchGETSupportTemplateStepDetails,
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
                  <FlatList
                    data={fetchData?.records}
                    listKey={'p2EcT6ZB'}
                    keyExtractor={({ item }) => item?.id || item?.uuid || item}
                    renderItem={({ item }) => {
                      const listData = item;
                      return (
                        <>
                          <View style={styles.ViewYL}>
                            <View style={styles.Viewgg}>
                              <View style={styles.ViewXp}>
                                <View style={styles.ViewML}>
                                  <Text
                                    style={[
                                      styles.TextrC,
                                      { color: theme.colors.strong },
                                    ]}
                                  >
                                    {listData?.fields?.prompt}
                                  </Text>

                                  <Text
                                    style={[
                                      theme.typography.caption,
                                      styles.Text_67,
                                      { color: theme.colors.medium },
                                    ]}
                                  >
                                    {listData?.fields?.details}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          <Divider
                            style={styles.DividerAS}
                            color={theme.colors.mediumLight}
                          />
                        </>
                      );
                    }}
                    numColumns={1}
                  />
                );
              }}
            </AirtableSupportToDoListsApi.FetchGETSupportTemplateStepDetailsGET>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  TextgV: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 28,
  },
  Textjb: {
    fontFamily: 'Roboto_400Regular',
  },
  Viewcs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    alignContent: 'flex-end',
    paddingBottom: 6,
  },
  Dividernv: {
    height: 4,
    width: '10%',
  },
  Viewmw: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  TextiP: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  ViewH8: {
    flexDirection: 'row',
    paddingTop: 2,
    paddingRight: 4,
    paddingBottom: 2,
    paddingLeft: 4,
  },
  View_6u: {
    flexDirection: 'row',
  },
  TextD6: {
    fontFamily: 'Roboto_500Medium',
    textAlign: 'left',
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  TextZF: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'left',
    fontSize: 14,
  },
  ViewP5: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderTopWidth: 2,
  },
  TextiQ: {
    fontFamily: 'Roboto_500Medium',
    textTransform: 'uppercase',
  },
  Textre: {
    fontFamily: 'Roboto_400Regular',
    textTransform: 'none',
    textDecorationLine: 'underline',
  },
  ViewV0: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ViewZ6: {
    alignContent: 'center',
    minWidth: 32,
    minHeight: 32,
    maxWidth: 32,
    maxHeight: 32,
    marginRight: 14,
  },
  TextrC: {
    fontFamily: 'Roboto_400Regular',
    flexShrink: 1,
    fontSize: 16,
  },
  Text_67: {
    fontFamily: 'Roboto_400Regular',
    marginTop: 4,
  },
  ViewML: {
    alignItems: 'flex-start',
    marginRight: 8,
    flex: 1,
  },
  ViewXp: {
    flexDirection: 'row',
  },
  Viewgg: {
    flex: 1,
  },
  ViewYL: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flex: 1,
    paddingTop: 16,
    paddingBottom: 8,
  },
  DividerAS: {
    height: 1,
  },
  FetchCp: {
    minHeight: 40,
  },
  View_18: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 48,
  },
});

export default withTheme(MainsupportdetailsScreen);
