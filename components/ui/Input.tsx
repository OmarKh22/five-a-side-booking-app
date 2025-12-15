import { TextInput, TextInputProps, View, Text } from 'react-native';
import { cn } from '../../lib/utils';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export function Input({ className, label, error, ...props }: InputProps) {
    return (
        <View className="w-full space-y-2">
            {label && <Text className="text-sm font-medium text-gray-700">{label}</Text>}
            <TextInput
                className={cn(
                    "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50",
                    error && "border-red-500",
                    className
                )}
                placeholderTextColor="#6b7280"
                {...props}
            />
            {error && <Text className="text-sm text-red-500">{error}</Text>}
        </View>
    );
}
