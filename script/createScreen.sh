#!/bin/bash
# Check if a folder name is provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <folder_name>"
  exit 1
fi

# Define the target directory and the new folder name from the input argument
TARGET_DIR="../app/screens"
NEW_FOLDER_NAME="$1"

# Navigate to the target directory
cd "$TARGET_DIR" || { echo "Target directory does not exist."; exit 1; }

# Create the new folder
mkdir -p "$NEW_FOLDER_NAME"

# Navigate into the new folder
cd "$NEW_FOLDER_NAME" || { echo "Failed to create or navigate into the new folder."; exit 1; }

# Create the index.tsx file
cat <<EOL > $NEW_FOLDER_NAME.tsx
import { View } from "react-native"
import { Screen, Header, Text } from "../../components"
import React from "react"

const $NEW_FOLDER_NAME = ({ navigation }) => {
  return (
    <Screen preset="fixed" style={{ paddingHorizontal: 20 }} safeAreaEdges={["top", "bottom"]}>
      <Header
        title="$NEW_FOLDER_NAME"
        leftIcon={"back"}
        leftIconColor="white"
        onLeftPress={() => {
          navigation.goBack()
        }}
      />

    </Screen>
  )
}

export default $NEW_FOLDER_NAME
EOL

# Create the style file
cat <<EOL > style.ts
import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({})
EOL

# Create the handler file
touch handler.ts

echo "Folder '$NEW_FOLDER_NAME' and file 'index.tsx' created successfully in $TARGET_DIR."
