"use client"
import {
  useDocumentDrawer,
  useListDrawer,
  Button,
  CalendarIcon,
  EditIcon,
} from "@payloadcms/ui"
import { useCallback } from "react"

export default function EditUserDrawer() {
  const [DocumentDrawer, DocumentDrawerToggler, { closeDrawer }] =
    useDocumentDrawer({
      collectionSlug: "users",
      id: "66ab5f70470e3ad87915fc1f",
    })
  const [ListDrawer, ListDrawerToggler, { closeDrawer: closelist }] =
    useListDrawer({
      collectionSlugs: ["users"],
    })

  const onSelect = useCallback(
    ({ collectionSlug, docID }: { collectionSlug: string, docID: string }) => {
      console.log({ collectionSlug, docID })
      closelist()
    },
    [closelist],
  )
  return (
    <div className="flex gap-4">
      <DocumentDrawerToggler>
        <Button className="button--primary" icon={<EditIcon />} size="medium">
          Edit User
        </Button>
      </DocumentDrawerToggler>
      <ListDrawerToggler>
        <Button
          className="button--primary"
          icon={<CalendarIcon />}
          size="medium"
        >
          List all users
        </Button>
      </ListDrawerToggler>
      <ListDrawer onSelect={onSelect} />
      <DocumentDrawer onSave={() => closeDrawer()} />
    </div>
  )
}
