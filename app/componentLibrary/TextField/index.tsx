import React, {
  ComponentType,
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors, spacing, typography} from '../../theme';
import {Text} from '../Text';

export interface TextFieldAccessoryProps {
  style: StyleProp<any>;
  status: TextFieldProps['status'];
  multiline: boolean;
  editable: boolean;
}

export interface TextFieldProps extends Omit<TextInputProps, 'ref'> {
  /**
   * A style modifier for different input states.
   */
  status?: 'error' | 'disabled';
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: string;
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps;
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: any;
  /**
   * Helper text which is looked up via i18n.
   */
  HelperTextProps?: TextProps;
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: any;
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>;
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>;
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>;
}

/**
 * A component that allows for the entering and editing of text.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-TextField.md)
 */
export const TextField = forwardRef(function TextField(
  props: TextFieldProps,
  ref: Ref<TextInput>,
) {
  const {
    label,
    placeholder,
    helper,
    status,
    RightAccessory,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    style: $inputStyleOverride,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    ...TextInputProps
  } = props;
  const input = useRef<TextInput>(null);

  const disabled = TextInputProps.editable === false || status === 'disabled';

  const placeholderContent = placeholder;

  const $containerStyles = [$containerStyleOverride];

  const $labelStyles = [$labelStyle, LabelTextProps?.style];

  const $inputWrapperStyles = [
    $inputWrapperStyle,
    status === 'error' && {borderColor: colors.error},
    TextInputProps.multiline && {minHeight: 112},
    LeftAccessory && {paddingStart: 0},
    RightAccessory && {paddingEnd: 0},
    $inputWrapperStyleOverride,
  ];

  const $inputStyles: StyleProp<TextStyle> = [
    $inputStyle,
    disabled && {color: colors.textDim},
    TextInputProps.multiline && {height: 'auto'},
    $inputStyleOverride,
  ];

  const $helperStyles = [
    $helperStyle,
    status === 'error' && {color: colors.error},
    HelperTextProps?.style,
  ];

  function focusInput() {
    if (disabled) return;

    input.current?.focus();
  }

  useImperativeHandle(ref, () => input.current as TextInput);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={$containerStyles}
      onPress={focusInput}
      accessibilityState={{disabled}}>
      {!!label && (
        <Text
          preset="formLabel"
          text={label}
          {...LabelTextProps}
          style={$labelStyles}
        />
      )}

      <View style={$inputWrapperStyles}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={$leftAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}

        <TextInput
          selectionColor={colors.palette.secondary}
          ref={input}
          underlineColorAndroid={colors.transparent}
          textAlignVertical="top"
          placeholder={placeholderContent}
          placeholderTextColor={colors.textDim}
          {...TextInputProps}
          editable={!disabled}
          style={$inputStyles}
        />

        {!!RightAccessory && (
          <RightAccessory
            style={$rightAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}
      </View>

      {!!helper && (
        <Text
          preset="formHelper"
          text={helper}
          {...HelperTextProps}
          style={$helperStyles}
        />
      )}
    </TouchableOpacity>
  );
});

const $labelStyle: TextStyle = {
  marginBottom: spacing.xs,
  color: colors.palette.primary,
};

const $inputWrapperStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderWidth: 1,
  borderRadius: 4,
  backgroundColor: colors.palette.neutral200,
  borderColor: colors.palette.neutral400,
  overflow: 'hidden',
};

const $inputStyle: TextStyle = {
  flex: 1,
  alignSelf: 'stretch',
  fontFamily: typography.primary.normal,
  color: colors.text,
  fontSize: 16,
  height: 24,
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: spacing.xs,
  marginHorizontal: spacing.sm,
};

const $helperStyle: TextStyle = {
  marginTop: spacing.xs,
};

const $rightAccessoryStyle: ViewStyle = {
  marginEnd: spacing.xs,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
};
const $leftAccessoryStyle: ViewStyle = {
  marginStart: spacing.xs,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
};
