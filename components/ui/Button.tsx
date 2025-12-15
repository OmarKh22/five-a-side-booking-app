import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { clsx } from 'clsx'; // Fallback import if cn usage fails due to missing dep temporarily, but we will fix dep.

// Note: We need 'class-variance-authority' for better variant handling usually, but for now we'll stick to simple props or install it.
// I'll install class-variance-authority as well.

interface ButtonProps extends TouchableOpacityProps {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
    className?: string;
    children: React.ReactNode;
}

export function Button({ className, variant = 'default', size = 'default', children, ...props }: ButtonProps) {
    return (
        <TouchableOpacity
            className={cn(
                "flex-row items-center justify-center rounded-lg font-medium",
                {
                    "bg-blue-600": variant === 'default',
                    "border border-gray-200 bg-white": variant === 'outline',
                    "bg-transparent": variant === 'ghost',
                    "h-10 px-4 py-2": size === 'default',
                    "h-9 px-3 rounded-md": size === 'sm',
                    "h-11 px-8 rounded-md": size === 'lg',
                },
                className
            )}
            {...props}
        >
            <Text className={cn(
                "text-sm font-medium transition-colors",
                {
                    "text-white": variant === 'default',
                    "text-gray-900": variant === 'outline',
                    "text-gray-700": variant === 'ghost',
                }
            )}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}
