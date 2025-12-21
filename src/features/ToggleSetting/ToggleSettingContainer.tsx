import React from 'react';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import { updateTaskApi } from '../../app/services/taskServices/updateTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { tasksSelectors } from '@/app/providers/store/slices/tasksSlice';
import { RootState } from '@/app/providers/store/types';
import { Checkbox } from '@mui/material';
import { SimpleRadioButtonIconChecked, SimpleRadioButtonIconUnchecked } from '@/shared/ui/Icons/ProfileIcons';
import { ToggleFullIcon } from '@/shared/ui/Icons/TaskIcon';
// import { ToggleTask } from '@/shared/ui/TaskManipulationIcons/ToggleTask';

import style from '@/app/styles/IconStyles.module.scss'

interface ToggleSettingContainerProps {
    isChecked: boolean,
    onClick?: () => void,
    size?: 'small' | 'medium'
}

export const ToggleSettingContainer = React.memo(({ isChecked, size = 'medium', onClick}: ToggleSettingContainerProps) => {
    const [letToggle, isLettingToggle] = useApiRequest(updateTaskApi, {})

    const handleToggle = useCallback((e: React.ChangeEvent) => {
        e.stopPropagation()

        if (!onClick) return

        onClick()

    }, [isChecked, letToggle])

    return (
        <ToggleSetting
            size={size}
            isChecked={isChecked}
            isLettingToggle={!onClick} // isLettingToggle
            handleToggle={handleToggle}
        />
    );
});

interface ToggleSettingProps {
    size: 'small' | 'medium';
    isChecked: boolean;
    isLettingToggle: boolean;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToggleSetting = React.memo(({size, isChecked, isLettingToggle, handleToggle}: ToggleSettingProps) => {
    return (
        <Checkbox
            icon={<SimpleRadioButtonIconUnchecked />}
            checkedIcon={<SimpleRadioButtonIconChecked />}
            checked={isChecked}
            onChange={handleToggle}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            disabled={isLettingToggle}

            className={isLettingToggle
                ? (style.taskIconStyle + ' ' + style.iconDisabled)
                : style.taskIconStyle}
            sx={{ p: size === 'small' ? '2px' : '0px' }}
        />
    )
})