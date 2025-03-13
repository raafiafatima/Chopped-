import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default function index () {
    return (
      <View className="flex-1 justify-center items-center bg-grey-600">
        <Text className="text-black text-2xl font-bold" style={{ fontFamily: 'barrio' }}> textInComponent </Text>
      </View>
    )
  }
