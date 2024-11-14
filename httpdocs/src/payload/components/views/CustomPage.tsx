// import type { AdminViewProps } from 'payload'
// import type { Collection}
// import React from 'react'
// // import Collec
//
// export const CustomPage: React.FC<AdminViewProps> = () => {
//   return (
//     <div>
//       <h1>RRHH VIEW</h1>
//       <br />
//       <p>This is a completely standalone view.</p>
//     </div>
//   )
// }
//
//
import React, { Fragment } from 'react'

import { AdminViewComponent } from 'payload'

const CustomPage: AdminViewComponent => {
  return (
    <Fragment>
      <div
        style={{
          marginTop: 'calc(var(--base) * 2)',
          paddingLeft: 'var(--gutter-h)',
          paddingRight: 'var(--gutter-h)',
        }}
      >
        <h1>Custom Dashboard View</h1>
        <p>This custom view was added through the Payload config:</p>
        <ul>
          <li>
            <code>components.views.Dashboard</code>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

export default CustomPage
