import React, { useEffect, useState } from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { FoodTitleTypography } from '../food-card/FoodCard.style'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import {alpha, Checkbox, FormControlLabel, styled} from '@mui/material'
import Radio from '@mui/material/Radio'
import { CustomTypographyLabel } from '../../styled-components/CustomTypographies.style'
import { getAmount } from '../../utils/customFunctions'
import VariationRequiredWarningAlert from './VariationRequiredWarningAlert'
import InfoIcon from '@mui/icons-material/Info';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
       color: alpha(theme.palette.primary.main,.8),
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: alpha(theme.palette.primary.main,.8),
        color:theme.palette.neutral[100]
    },
}));
export const ChoiceValues = (props) => {
    const {
        choice,
        t,
        radioCheckHandler,
        choiceIndex,
        changeChoices,
        currencySymbolDirection,
        currencySymbol,
        digitAfterDecimalPoint,
    } = props
    const [radioData, setRadioData] = useState({ isChecked: false })
    useEffect(() => {
        radioData?.option &&
            changeChoices(
                radioData.e,
                radioData.option,
                radioData.index,
                radioData.choiceIndex,
                radioData.choiceRequired,
                radioData.choiceType,
                radioData.isChecked
            )
    }, [radioData])
    const handleRadioData = (
        e,
        option,
        index,
        choiceIndex,
        choiceRequired,
        choiceType
    ) => {
        if (
            radioData?.choiceIndex === choiceIndex &&
            radioData?.index === index
        ) {
            setRadioData({
                ...radioData,
                isChecked: !radioData.isChecked,
                e,
                option,
                index,
                choiceIndex,
                choiceRequired,
                choiceType,
            })
        } else {
            setRadioData({
                ...radioData,
                isChecked: true,
                e,
                option,
                index,
                choiceIndex,
                choiceRequired,
                choiceType,
            })
        }
    }
    let text
    if (choice) {
        text = `${t(
            'This Variation needs to be selected in between minimum'
        )} ${choice?.min} ${t('and maximum')} ${choice?.max} ${t(
            'items.'
        )}`
    }
    return (
        <CustomStackFullWidth
            paddingLeft={{
                xs: '10px',
                md: '0px',
            }}
            paddingRight={{
                xs: '5px',
                md: '10px',
            }}
        >
            <FoodTitleTypography
                gutterBottom
                fontWeight="600"
                component="h6"
                sx={{
                    margin: '5px 0',
                    textAlign: 'left',
                }}
            >
                {choice.name} {" "}:
                {choice?.type === 'multi' &&
                    <CustomTooltip title={text} placement="top-start">
                        <InfoIcon style={{with: "12px", height: "12px", cursor: "pointer"}} color="primary"/>
                    </CustomTooltip>}


                {/*{choice.required === 'on' ? t('(required)') : t('(optional)')}:*/}
            </FoodTitleTypography>
            <FormControl fullWidth>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    sx={{
                        marginLeft: '20px',
                        width: {
                            xs: '90%',
                            sm: '95%',
                            md: '95%',
                        },
                    }}

                >
                    {choice.values?.map((option, index) => (
                        <CustomStackFullWidth
                            key={index}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                        >
                            <FormControlLabel
                                value={option.label}
                                control={
                                    choice?.type === 'single' ? (
                                        <Radio
                                            checked={radioCheckHandler(
                                                choiceIndex,
                                                option,
                                                index
                                            )}
                                            onClick={(e) =>
                                                handleRadioData(
                                                    e,
                                                    option,
                                                    index,
                                                    choiceIndex,
                                                    choice.required,
                                                    choice?.type
                                                )
                                            }
                                        />
                                    ) : (
                                        <Checkbox
                                            defaultChecked={option?.isSelected}
                                            onChange={(e) =>
                                                changeChoices(
                                                    e,
                                                    option,
                                                    index,
                                                    choiceIndex,
                                                    choice.required,
                                                    choice?.type,
                                                    radioData.isChecked
                                                )
                                            }
                                        />
                                    )
                                }
                                label={
                                    <CustomTypographyLabel>
                                        {option.label}
                                    </CustomTypographyLabel>
                                }
                            />
                            <CustomTypographyLabel>
                                {option.optionPrice === '0'
                                    ? '0'
                                    : `+${getAmount(
                                          option.optionPrice,
                                          currencySymbolDirection,
                                          currencySymbol,
                                          digitAfterDecimalPoint
                                      )}`}
                            </CustomTypographyLabel>
                        </CustomStackFullWidth>
                    ))}
                </RadioGroup>
            </FormControl>
            {/*{choice?.type === 'multi' && (*/}
            {/*    <VariationRequiredWarningAlert*/}
            {/*        alertData={choice}*/}
            {/*        type="info"*/}
            {/*        t={t}*/}
            {/*    />*/}
            {/*)}*/}
        </CustomStackFullWidth>
    )
}
