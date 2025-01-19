import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import React from 'react'

export default function BudgetSaver() {
    const [maxBudget, setMaxBudget] = useState<string>('')

    const handleSave = () => {
        const budget = parseFloat(maxBudget)
        if (isNaN(budget) || budget < 0) {
            toast({
                title: "Invalid input",
                description: "Please enter a valid positive number for your budget.",
                variant: "destructive",
            })
            return
        }

        // Save to Chrome storage
        chrome.storage.sync.set({ maxBudget: budget }, () => {
            if (chrome.runtime.lastError) {
                toast({
                    title: "Error",
                    description: "Failed to save budget. Please try again.",
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Success",
                    description: "Your maximum budget has been saved.",
                })
            }
        })
    }

    useEffect(() => {
        chrome.storage.sync.get(['maxBudget'], (result) => {
            if (result) {
                setMaxBudget(result.maxBudget)
            }
        })
    }, [])

    return (
        <div className="flex flex-col space-y-4 items-start">
            <h2 className="text-lg font-semibold">Set Your Maximum Budget</h2>
            <div className="flex flex-row items-center space-x-2">
                <Input
                    type="number"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    placeholder="CAD ($)"
                    className="flex-grow"
                    min={0}
                />
                <Button className="shrink-0" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    )
}

