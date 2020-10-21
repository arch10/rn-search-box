import React, { useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text, Keyboard } from 'react-native'
import PropTypes from "prop-types";

const SearchBox = ({
    placeholder,
    id,
    onChange,
    onBlur,
    onFocus,
    value,
    cancelText,
    autoCapitalize,
    style,
    persistentCancel,
    placeholderColor,
    activeStyle,
    inactiveStyle,
    cornerRadius,
    enableCancel,
    startIcon,
    clearIcon,
    onCancel,
    keyType,
    startIconViewStyle,
    startIconStyle,
    cancelViewStyle,
    cancelTextStyle,
    clearIconViewStyle,
    clearIconStyle
}) => {

    const [focus, setFocus] = useState(false)
    const [text, setText] = useState('')

    const getStyle = (active) => {
        if (active) {
            return { ...styles.active, ...activeStyle }
        } else {
            return { ...styles.inactive, ...inactiveStyle }
        }
    }

    const styles = StyleSheet.create({
        active: {
            borderColor: "#1E74AA",
            borderWidth: 1,
            borderRadius: cornerRadius,
            color: "#1A1A1A",
            fontSize: 17,
            letterSpacing: -0.41,
            backgroundColor: "#F6F6F6",
            paddingHorizontal: 16,
            paddingRight: 38,
            paddingBottom: 6,
            paddingTop: 6,
            flex: 1
        },
        inactive: {
            borderColor: "#80808050",
            borderWidth: 1,
            borderRadius: cornerRadius,
            color: "#1A1A1A",
            fontSize: 17,
            letterSpacing: -0.41,
            backgroundColor: "transparent",
            paddingHorizontal: 16,
            paddingRight: 38,
            paddingBottom: 6,
            paddingTop: 6,
            flex: 1
        },
        startIconView: {
            position: 'absolute',
            justifyContent: 'center',
            left: 0,
            height: '100%',
            marginStart: 12,
            marginEnd: 4
        },
        startIcon: {
            height: 24,
            width: 24,
        },
        cancelView: {
            alignSelf: 'center',
            marginStart: 16,
        },
        cancelText: {
            fontSize: 15,
            letterSpacing: -0.24,
            lineHeight: 20,
            color: "#1E74AA"
        },
        clearIcon: {
            height: 18,
            width: 18
        },
        clearIconView: {
            position: 'absolute',
            justifyContent: 'center',
            right: 0,
            marginRight: 16,
            height: '100%',
        }
    })

    const startPadding = startIcon ? styles.startIconView.marginStart + styles.startIcon.width + styles.startIconView.marginEnd : null

    const clrIcon = clearIcon ? clearIcon : require('./images/clear_icon.png')

    return (
        <View style={[{ flexDirection: 'row' }, style]}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <TextInput style={[getStyle(focus), startIcon ? { paddingStart: startPadding } : null]}
                    textAlignVertical="center"
                    placeholder={placeholder}
                    placeholderTextColor={placeholderColor}
                    autoCapitalize={autoCapitalize}
                    testID={id}
                    returnKeyType={keyType}
                    accessibilityLabel={id}
                    onChangeText={text => {
                        onChange(text)
                        setText(text)
                    }}
                    onBlur={() => {
                        setFocus(false)
                        onBlur()
                    }}
                    value={(value !== null) ? value : text}
                    onFocus={() => {
                        setFocus(true)
                        onFocus()
                    }}
                />
                {startIcon && <View style={[styles.startIconView, startIconViewStyle]}>
                    <Image source={startIcon} style={[styles.startIcon, startIconStyle]} />
                </View>}
                {(text.length !== 0 && focus) ?
                    <TouchableOpacity onPress={() => {
                        setText("")
                        onChange("")
                    }} style={[styles.clearIconView, clearIconViewStyle]} activeOpacity={1}>
                        <Image source={clrIcon} style={[styles.clearIcon, clearIconStyle]} />
                    </TouchableOpacity>
                    : null}
            </View>
            {((focus && enableCancel) || persistentCancel) &&
                <TouchableOpacity
                    onPress={() => {
                        onCancel()
                        Keyboard.dismiss()
                        setFocus(false)
                    }}
                    style={[styles.cancelView, cancelViewStyle]}
                    activeOpacity={1}>
                    <Text style={[styles.cancelText, cancelTextStyle]}>{cancelText}</Text>
                </TouchableOpacity>}
        </View>
    )
}

SearchBox.PropTypes = {
    placeholder: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onCancel: PropTypes.func,
    startIcon: PropTypes.any,
    clearIcon: PropTypes.any,
    active: PropTypes.bool,
    keyType: PropTypes.string,
    cancelText: PropTypes.string,
    style: PropTypes.object,
    startIconViewStyle: PropTypes.object,
    startIconStyle: PropTypes.object,
    cancelViewStyle: PropTypes.object,
    cancelTextStyle: PropTypes.object,
    clearIconViewStyle: PropTypes.object,
    clearIconStyle: PropTypes.object,
    placeholderColor: PropTypes.string,
    persistentCancel: PropTypes.bool,
    activeStyle: PropTypes.object,
    inactiveStyle: PropTypes.object,
    cornerRadius: PropTypes.number,
    enableCancel: PropTypes.bool,
    keyboardAppearance: PropTypes.oneOf(['default', 'light', 'dark']),
    autoCapitalize: PropTypes.oneOf([
        'none',
        'words',
        'sentences',
        'characters',
    ]),
}

SearchBox.defaultProps = {
    placeholder: "Search",
    id: 'search',
    onChange: () => null,
    onBlur: () => null,
    onFocus: () => null,
    onCancel: () => null,
    startIcon: null,
    clearIcon: null,
    active: false,
    keyType: 'search',
    cancelText: 'Cancel',
    style: null,
    startIconViewStyle: null,
    startIconStyle: null,
    cancelViewStyle: null,
    cancelTextStyle: null,
    clearIconViewStyle: null,
    clearIconStyle: null,
    placeholderColor: "#979797",
    persistentCancel: false,
    activeStyle: null,
    inactiveStyle: null,
    cornerRadius: 0,
    enableCancel: false,
    keyboardAppearance: 'default',
    autoCapitalize: 'none'
}

export default SearchBox;