export default function UserAction() {
  console.log("UserAction")
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--base) / 4)",
      }}
    >
      <p
        className="nav__label"
        style={{ color: "var(--theme-text)", margin: 0 }}
      >
        User Action
      </p>
    </div>
  )
}
