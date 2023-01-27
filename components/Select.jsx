import Select from "react-select"
import { FixedSizeList as List } from "react-window"

function customSelect({ label, onChange, value, options }) {
  const items = options && [
    { label: label, value: 0 },
    ...options.map((option, i) => ({ label: option, value: option })),
  ]

  const MenuList = (props) => {
    const rows = props.children
    const rowRenderer = ({ index, style }) => (
      <div style={style}>{rows[index]}</div>
    )
    return (
      options && (
        <List
          height={items.length > 4 ? 150 : 38 * items.length}
          itemCount={items.length}
          itemSize={35}
          width={250}
        >
          {rowRenderer}
        </List>
      )
    )
  }

  return (
    <Select
      value={
        value ? { label: value, value: value } : { label: label, value: 0 }
      }
      onChange={onChange}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: 250,
        }),
      }}
      components={{ MenuList }}
      options={items}
    />
  )
}

export { customSelect as Select }
