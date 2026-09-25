export type ContactDraft = {
  name: string;
  email: string;
  message: string;
};

let draft: ContactDraft = { name: "", email: "", message: "" };

export function getContactDraft() {
  return { ...draft };
}

export function setContactDraft(next: Partial<ContactDraft>) {
  draft = { ...draft, ...next };
}

export function clearContactDraft() {
  draft = { name: "", email: "", message: "" };
}
