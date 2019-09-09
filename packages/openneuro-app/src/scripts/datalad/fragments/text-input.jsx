import React, { useState, createRef } from 'react'
import { PropTypes } from 'prop-types'
import styled from '@emotion/styled'

const Container = styled.div(
  {
    position: 'relative',
    width: '100%',
    marginBottom: '0.5rem',
  },
  ({ textarea }) =>
    textarea
      ? {}
      : {
          height: '4rem',
        },
)
const centerLabelStyles = {
  top: '1rem',
  fontSize: '1em',
}
const pushedUpLabelStyles = {
  top: '0.4rem',
  fontSize: '0.75em',
}
const Label = styled.label(
  {
    position: 'absolute',
    left: '1rem',
    right: '1rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: '#999',
    transition: 'top 100ms, font-size 100ms',
    transitionTimingFunction: 'ease-out',
  },
  ({ hasValue, hasFocus }) => ({
    ...(hasValue || hasFocus ? pushedUpLabelStyles : centerLabelStyles),
    ':focus': pushedUpLabelStyles,
  }),
)
const DisabledIcon = styled.i({
  position: 'absolute',
  top: '0.4rem',
  right: '0.4rem',
  color: '#5cb85c',
})
const Input = styled.input({
  borderRadius: '5px',
  width: '100%',
  height: '100%',
  padding: '1.5rem 0.8rem 0.3rem',
})
const Textarea = styled.textarea({
  width: '100%',
  border: '1px inset #eee',
  borderRadius: '5px',

  padding: '1.5rem 0.8rem 0.3rem',
})

const TextInput = ({
  name,
  label,
  value,
  disabled,
  textarea,
  nullMessage,
  required,
  onChange,
}) => {
  if (value === null) {
    if (nullMessage) value = nullMessage
    else value = ''
  } else value = value.toString()
  const [hasFocus, setHasFocus] = useState(false)
  const input = createRef()

  const focusInput = () => {
    if (document.activeElement !== input) {
      input.current.focus()
      setHasFocus(true)
    }
  }

  const removeFocus = () => setHasFocus(false)

  const handleChange = e => onChange(e.target.name, e.target.value)

  return (
    <Container textarea={textarea}>
      <Label
        htmlFor={name}
        hasValue={Boolean(value)}
        hasFocus={hasFocus}
        onClick={focusInput}>
        {label}
      </Label>
      {disabled && <DisabledIcon className="fa fa-asterisk" />}
      {textarea ? (
        <Textarea
          ref={input}
          name={name}
          value={value}
          onFocus={focusInput}
          onBlur={removeFocus}
          onChange={handleChange}
        />
      ) : (
        <Input
          ref={input}
          name={name}
          value={value}
          disabled={disabled}
          onFocus={focusInput}
          onBlur={removeFocus}
          onChange={handleChange}
          required={required}
        />
      )}
    </Container>
  )
}

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
  ]),
  disabled: PropTypes.bool,
  textarea: PropTypes.bool,
  nullMessage: PropTypes.string,
  onChange: PropTypes.func,
}

export default TextInput