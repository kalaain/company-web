export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

const teamRoles = [
  {
    role: "Pemilik & Direktur Utama",
    bio: "Pengalaman lebih dari 15 tahun di bidang distribusi produk pertanian dan pakan ternak.",
  },
  {
    role: "Kepala Bagian Produk & Pengadaan",
    bio: "Ahli dalam seleksi produk pestisida, pupuk, dan pakan ternak dari produsen terpercaya.",
  },
  {
    role: "Konsultan Lapangan & Agronomi",
    bio: "Lulusan pertanian yang mendampingi petani dan peternak dalam pemilihan produk yang tepat.",
  },
  {
    role: "Kepala Penjualan & Kemitraan",
    bio: "Mengelola jaringan distribusi dan hubungan dengan mitra toko tani di berbagai daerah.",
  },
  {
    role: "Kepala Gudang & Logistik",
    bio: "Memastikan stok produk selalu tersedia dan pengiriman tepat waktu ke seluruh mitra.",
  },
  {
    role: "Admin & Layanan Pelanggan",
    bio: "Menangani pemesanan, keluhan, dan memberikan informasi produk kepada pelanggan.",
  },
];

type RandomUserResponse = {
  results: {
    login: { uuid: string };
    name: { first: string; last: string };
    picture: { large: string };
  }[];
};

export async function getDynamicTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await fetch(
      `https://randomuser.me/api/?results=${teamRoles.length}&nat=us,gb,au`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch team members");
    }

    const data: RandomUserResponse = await response.json();

    return data.results.map((user, index) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      photo: user.picture.large,
      role: teamRoles[index].role,
      bio: teamRoles[index].bio,
    }));
  } catch {
    return teamRoles.map((item, index) => ({
      id: String(index + 1),
      name: `Team Member ${index + 1}`,
      photo: `https://i.pravatar.cc/400?img=${index + 10}`,
      role: item.role,
      bio: item.bio,
    }));
  }
}