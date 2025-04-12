import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      const { id, first_name, last_name, email_addresses } = evt.data;
      const primaryEmail = email_addresses.find(
        (email) => email.id === evt.data.primary_email_address_id
      );

      if (!primaryEmail) {
        return new Response("No primary email found", { status: 400 });
      }

      // Insert the new user into our database
      await db.insert(usersTable).values({
        clerk_id: id,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        email: primaryEmail.email_address,
      });

      return new Response("User created", { status: 201 });
    }

    // Handle other webhook types if needed
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}

// TEST PAYLOAD
/*
Webhook payload: {
  birthday: '',
  created_at: 1654012591514,
  email_addresses: [
    {
      email_address: 'example@example.org',
      id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
      linked_to: [],
      object: 'email_address',
      verification: [Object]
    }
  ],
  external_accounts: [],
  external_id: '567772',
  first_name: 'Example',
  gender: '',
  id: 'user_29w83sxmDNGwOuEthce5gg56FcC',
  image_url: 'https://img.clerk.com/xxxxxx',
  last_name: 'Example',
  last_sign_in_at: 1654012591514,
  object: 'user',
  password_enabled: true,
  phone_numbers: [],
  primary_email_address_id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
  primary_phone_number_id: null,
  primary_web3_wallet_id: null,
  private_metadata: {},
  profile_image_url: 'https://www.gravatar.com/avatar?d=mp',
  public_metadata: {},
  two_factor_enabled: false,
  unsafe_metadata: {},
  updated_at: 1654012591835,
  username: null,
  web3_wallets: []
}
*/
