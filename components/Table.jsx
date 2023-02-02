import React from "react"
import { useVirtual } from "react-virtual"
import { Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import SortButtons from "./SortButtons"

const thStyles = {
  margin: 0,
  position: "sticky",
  top: 0,
  zIndex: 2,
  background: "#ffffff",
  textAlign: "start",
  color: "#4e596b",
  fontSize: "13px",
  textTransform: "uppercase",
  paddingBottom: "10px",
}

const tdStyles = {
  padding: "15px 0",
  borderBottom: "1px solid #eeeeee",
  borderTop: "1px solid #eeeeee",
}

function Table({ results: rows, sortResults }) {
  const parentRef = React.useRef()

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
  })

  const items = rowVirtualizer.virtualItems
  const paddingTop = items.length > 0 ? items[0].start : 0
  const paddingBottom =
    items.length > 0
      ? rowVirtualizer.totalSize - items[items.length - 1].end
      : 0

  return (
    <div
      ref={parentRef}
      style={{
        height: `100%`,
        width: `100%`,
        overflow: "auto",
      }}
    >
      <table
        style={{
          "--virtualPaddingTop": paddingTop + "px",
          "--virtualPaddingBottom": paddingBottom + "px",
          fontFamily: "arial, sans-serif",
          borderCollapse: "collapse",
          width: "100%",
          tableLayout: "fixed",
          borderSpacing: 0,
          isolation: "isolate",
        }}
      >
        <caption
          style={{ captionSide: "bottom", padding: "15px 0", color: "#777777" }}
        >
          Data collected from{" "}
          <Link
            color="blue.500"
            href="https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars"
            isExternal
          >
            this table
          </Link>
          . Yo can read about it{" "}
          <Link
            color="blue.500"
            href="https://exoplanetarchive.ipac.caltech.edu/docs/pscp_about.html"
            isExternal
          >
            here
          </Link>
          .
        </caption>
        <thead>
          <tr>
            <th style={thStyles}>
              Planet Name{" "}
              <SortButtons field={"pl_name"} sortResults={sortResults} />
            </th>
            <th style={thStyles}>
              Host Name{" "}
              <SortButtons field={"hostname"} sortResults={sortResults} />
            </th>
            <th style={thStyles}>
              Discovery Method{" "}
              <SortButtons
                field={"discoverymethod"}
                sortResults={sortResults}
              />
            </th>
            <th style={thStyles}>
              Discovery Year{" "}
              <SortButtons field={"disc_year"} sortResults={sortResults} />
            </th>
            <th style={thStyles}>
              Discovery Facility{" "}
              <SortButtons field={"disc_facility"} sortResults={sortResults} />
            </th>
          </tr>
        </thead>
        <tbody>
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const row = rows[virtualRow.index]
            return (
              <tr key={virtualRow.index} ref={virtualRow.measureRef}>
                <td
                  style={{
                    ...tdStyles,
                    paddingLeft: "10px",
                  }}
                >
                  <Link
                    color="blue.500"
                    href={
                      `https://exoplanetarchive.ipac.caltech.edu/overview/` +
                      row.pl_name
                    }
                    isExternal
                  >
                    {row.pl_name} <ExternalLinkIcon mx="2px" />
                  </Link>
                </td>
                <td style={tdStyles}>{row.hostname}</td>
                <td style={tdStyles}>{row.discoverymethod}</td>
                <td style={tdStyles}>{row.disc_year}</td>
                <td style={{ ...tdStyles, paddingRight: "10px" }}>
                  {row.disc_facility}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <style jsx>{`
        tbody::before {
          display: block;
          padding-top: var(--virtualPaddingTop);
          content: "";
        }
        tbody::after {
          display: block;
          padding-bottom: var(--virtualPaddingBottom);
          content: "";
        }
      `}</style>
    </div>
  )
}

export { Table }
