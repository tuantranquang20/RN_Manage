import {colors} from '@app/constants/Theme';
import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Error from './Error';
import Loading from './Loading';
import RNHeader from './RNHeader';

const ScreenComponent = (props) => {
  const {
    titleHeader,
    rightButton,
    rightPress,
    leftButton,
    leftPress,
    back,
    bgColor,
  } = props;

  const renderBody = () => {
    const {
      renderView,
      isLoading,
      isError,
      reload,
      bottomSheet,
      disableScrollView,
      contentContainerStyle,
      bounces,
      style,
    } = props;
    if (isLoading) return <Loading />;
    if (isError) return <Error reload={reload} />;
    if (disableScrollView) return <View style={{flex: 1}}>{renderView}</View>;
    if (reload)
      return (
        <ScrollView
          bounces={bounces}
          keyboardShouldPersistTaps={'handled'}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={reload} />
          }>
          {renderView}
        </ScrollView>
      );
    if (bottomSheet) return renderView;
    return (
      <ScrollView
        bounces={bounces}
        keyboardShouldPersistTaps={'handled'}
        style={[{flex: 1}, style]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}>
        {renderView}
      </ScrollView>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.lightGrey || bgColor,
        paddingBottom: 10,
      }}
      onTouchStart={Keyboard.dismiss}>
      {titleHeader && (
        <RNHeader
          titleHeader={titleHeader}
          back={back}
          rightButton={rightButton}
          rightPress={rightPress}
          leftButton={leftButton}
          leftPress={leftPress}
        />
      )}
      <StatusBar translucent />
      <SafeAreaView style={{flex: 1}}>
        {/* <KeyboardAvoidingView
            style={{ flex: 1 }}
            enabled
            behavior={Platform.OS == "ios" ? "padding" : undefined}
            keyboardVerticalOffset={80}
          > */}
        {renderBody()}
        {/* </KeyboardAvoidingView> */}
      </SafeAreaView>
    </View>
  );
};

export default ScreenComponent;
