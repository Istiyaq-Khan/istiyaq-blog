"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    debounceMs?: number;
}

export function SearchInput({
    value,
    onChange,
    placeholder = "Search...",
    className = "",
    debounceMs = 300,
}: SearchInputProps) {
    const [localValue, setLocalValue] = useState(value);

    // Debounce the onChange callback
    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(localValue);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [localValue, debounceMs, onChange]);

    // Sync with external value changes
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleClear = () => {
        setLocalValue("");
        onChange("");
    };

    return (
        <div className={`relative ${className}`}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="text"
                placeholder={placeholder}
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                className="pl-9 pr-9"
                aria-label="Search"
            />
            {localValue && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                    onClick={handleClear}
                    aria-label="Clear search"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}
