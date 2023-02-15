import * as React from "react"
import Select from "react-select"
import { useVirtual } from "react-virtual"

function MenuList(props) {
  const rows = props.children
  const parentRef = React.useRef()
  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
    overscan: 5,
  })

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: 200,
          width: `100%`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const row = rows[virtualRow.index]
            return (
              <div
                className="list-item"
                key={virtualRow.index}
                ref={virtualRow.measureRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "fit-content",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

function VirtualizedSelect({ label, onChange, value, options }) {
  const items = options && [
    { label: label, value: 0 },
    ...options.map((option, i) => ({ label: option, value: option })),
  ]

  if (options) {
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
        isSearchable={false}
      />
    )
  } else {
    return (
      <Select
        value={{ label: label, value: 0 }}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            width: 250,
          }),
        }}
        isSearchable={false}
      />
    )
  }
}

export { VirtualizedSelect as Select }
