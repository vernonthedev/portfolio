import { prisma } from "@/lib/prisma";
import { Mail, Phone, Calendar, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
};

async function getContacts() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contacts = await (prisma as any).contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return contacts;
}

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="font-youth text-4xl mb-2"
          style={{ color: "var(--base)" }}
        >
          Contact Messages
        </h1>
        <p style={{ color: "var(--grey)" }}>
          Manage messages from your contact form
        </p>
      </div>

      <div className="grid gap-6">
        {contacts.length === 0 ? (
          <div
            className="p-8 rounded-2xl border text-center"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-d)",
              color: "var(--grey)",
            }}
          >
            No messages found.
          </div>
        ) : (
          contacts.map((contact: Contact) => (
            <div
              key={contact.id}
              className="p-6 rounded-2xl border transition-all hover:shadow-lg"
              style={{
                borderColor: "var(--border-subtle)",
                backgroundColor: "var(--bg-d)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold uppercase"
                      style={{
                        backgroundColor: "var(--orange)20",
                        color: "var(--orange)",
                      }}
                    >
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <h3
                        className="font-bold text-lg"
                        style={{ color: "var(--base)" }}
                      >
                        {contact.name}
                      </h3>
                      <div
                        className="flex items-center gap-2 text-sm"
                        style={{ color: "var(--grey)" }}
                      >
                        <Calendar className="w-3 h-3" />
                        {new Date(contact.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ backgroundColor: "var(--bg)" }}
                    >
                      <Mail
                        className="w-4 h-4"
                        style={{ color: "var(--orange)" }}
                      />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm hover:underline"
                        style={{ color: "var(--base)" }}
                      >
                        {contact.email}
                      </a>
                    </div>
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ backgroundColor: "var(--bg)" }}
                    >
                      <Phone
                        className="w-4 h-4"
                        style={{ color: "var(--orange)" }}
                      />
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-sm hover:underline"
                        style={{ color: "var(--base)" }}
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: "var(--bg)" }}
                  >
                    <div className="flex items-start gap-3">
                      <MessageSquare
                        className="w-4 h-4 mt-1 flex-shrink-0"
                        style={{ color: "var(--orange)" }}
                      />
                      <p
                        className="text-sm leading-relaxed whitespace-pre-wrap"
                        style={{ color: "var(--base)" }}
                      >
                        {contact.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
