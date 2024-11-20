import React from 'react'

function Footer() {
  const d = new Date();
  const year = d.getFullYear()
  return (
    <div>
      <div className="container">
  <footer className="py-3 my-4">
   
    <p className="text-center border-top text-muted pb-3 mb-3">© {year} Company, Inc</p>
  </footer>
</div>
    </div>
  )
}

export default Footer
