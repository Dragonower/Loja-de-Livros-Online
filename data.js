(function () {
  const books = [
    {
      id: 1,
      title: 'A história ainda não escrita',
      author: 'Marcos Silva',
      price: 34.9,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1563818072824-ed3d6ff52955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwYm9vayUyMGNvdmVyJTIwZGFya3xlbnwxfHx8fDE3NzQ4NTU2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Romance',
      description: 'Uma história real de amor, amadurecimento e segundas chances. Do primeiro encontro ao pedido de namoro, acompanhe a jornada de Marcos e Analy.',
      isbn: '978-8560280476',
      pages: 120,
      publisher: 'Editora Amor Verdadeiro',
      language: 'Português'
    },
    {
      id: 2,
      title: 'Raindance',
      author: 'Dave, Tems',
      price: 28.9,
      rating: 5,
      image: 'https://i.scdn.co/image/ab67616d0000b273fecaa7826bb0cbe139a8cb83',
      category: 'Love',
      description: 'My darling cant you see? I love you',
      isbn: '978-8539004119',
      pages: 408,
      publisher: 'Objetiva',
      language: 'Português'
    },
    {
      id: 3,
      title: 'A Rainha Vermelha',
      author: 'Victoria Aveyard',
      price: 34.9,
      rating: 4,
      image: 'https://images.unsplash.com/photo-1633107966767-ddb0f9da7883?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjByb21hbmNlJTIwaGVhcnR8ZW58MXx8fHwxNzc0ODc1NzExfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Fantasia',
      description: 'Em um mundo dividido por sangue vermelho e prateado, uma garota comum descobre ter um poder especial.',
      isbn: '978-8555340116',
      pages: 424,
      publisher: 'Seguinte',
      language: 'Português'
    },
    {
      id: 4,
      title: 'O Código Da Vinci',
      author: 'Dan Brown',
      price: 45.9,
      rating: 4,
      image: 'https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBzdXNwZW5zZSUyMHRocmlsbGVyfGVufDF8fHx8MTc3NDg3NTcxMXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Suspense',
      description: 'Um thriller que mistura arte, história e mistério em uma trama envolvente.',
      isbn: '978-8580410686',
      pages: 432,
      publisher: 'Arqueiro',
      language: 'Português'
    },
    {
      id: 5,
      title: 'A Guerra dos Tronos',
      author: 'George R. R. Martin',
      price: 59.9,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1763315371267-86318801d8ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBmYW50YXN5JTIwZHJhZ29ufGVufDF8fHx8MTc3NDg3NTcxMXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Fantasia',
      description: 'O primeiro livro da épica saga As Crônicas de Gelo e Fogo.',
      isbn: '978-8544102398',
      pages: 694,
      publisher: 'Leya',
      language: 'Português'
    },
    {
      id: 6,
      title: 'O Alquimista',
      author: 'Paulo Coelho',
      price: 29.9,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1670523798656-eda0ea506db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWN0aW9uJTIwYm9vayUyMGNvdmVyJTIwY29sb3JmdWx8ZW58MXx8fHwxNzc0ODc1NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Romance',
      description: 'A jornada de um jovem pastor andaluz em busca de seu tesouro pessoal.',
      isbn: '978-8573022094',
      pages: 208,
      publisher: 'Paralela',
      language: 'Português'
    },
    {
      id: 7,
      title: 'Neuromancer',
      author: 'William Gibson',
      price: 42.9,
      rating: 4,
      image: 'https://images.unsplash.com/photo-1667530055814-b7c98f34d226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjB0ZWNobm9sb2d5JTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzc0ODc1NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Tecnologia',
      description: 'O romance que definiu o gênero cyberpunk e inspirou Matrix.',
      isbn: '978-8576572800',
      pages: 304,
      publisher: 'Aleph',
      language: 'Português'
    },
    {
      id: 8,
      title: 'Pequena Abelha',
      author: 'Chris Cleave',
      price: 36.9,
      rating: 4,
      image: 'https://images.unsplash.com/photo-1772380407481-81b8f13bd010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGl0ZXJhdHVyZSUyMGJvb2t8ZW58MXx8fHwxNzc0ODI4Nzc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Romance',
      description: 'Uma história comovente sobre refugiados e a busca por uma vida melhor.',
      isbn: '978-8580571912',
      pages: 336,
      publisher: 'Prumo',
      language: 'Português'
    },
    {
      id: 9,
      title: 'A Mensagem',
      author: 'Fernando Pessoa',
      price: 24.9,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1772380407481-81b8f13bd010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGl0ZXJhdHVyZSUyMGJvb2t8ZW58MXx8fHwxNzc0ODI4Nzc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Romance',
      description: 'Poemas épicos sobre a história de Portugal e o sebastianismo.',
      isbn: '978-8535908770',
      pages: 96,
      publisher: 'Companhia das Letras',
      language: 'Português'
    },
    {
      id: 10,
      title: 'É Assim Que Acaba',
      author: 'Colleen Hoover',
      price: 39.9,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1633107966767-ddb0f9da7883?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjByb21hbmNlJTIwaGVhcnR8ZW58MXx8fHwxNzc0ODc1NzExfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Romance',
      description: 'Um romance intenso sobre relacionamentos abusivos e recomeços.',
      isbn: '978-8584391325',
      pages: 368,
      publisher: 'Galera',
      language: 'Português'
    },
    {
      id: 11,
      title: '1984',
      author: 'George Orwell',
      price: 34.9,
      rating: 5,
      image: 'https://images.unsplash.com/photo-1563818072824-ed3d6ff52955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwYm9vayUyMGNvdmVyJTIwZGFya3xlbnwxfHx8fDE3NzQ4NTU2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Suspense',
      description: 'Um clássico distópico sobre totalitarismo e vigilância.',
      isbn: '978-8535914849',
      pages: 416,
      publisher: 'Companhia das Letras',
      language: 'Português'
    },
    {
      id: 12,
      title: 'Scimed Âmnias',
      author: 'Joshua Harris',
      price: 32.9,
      rating: 4,
      image: 'https://images.unsplash.com/photo-1667530055814-b7c98f34d226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjB0ZWNobm9sb2d5JTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzc0ODc1NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Tecnologia',
      description: 'Explorando os limites da ciência e tecnologia no futuro.',
      isbn: '978-8576572817',
      pages: 288,
      publisher: 'TechBooks',
      language: 'Português'
    }
  ];

  const categories = [
    { name: 'Romance', symbol: '❤', color: '#d4a574' },
    { name: 'Fantasia', symbol: '✦', color: '#5c3a2e' },
    { name: 'Tecnologia', symbol: '⌘', color: '#8b6f47' },
    { name: 'Suspense', symbol: '◈', color: '#4a3527' },
    { name: 'Autoajuda', symbol: '☼', color: '#9d7f5c' }
  ];

  window.BOOKSTORE_DATA = {
    books: books,
    bookContent: {},
    categories: categories,
    heroImage: './src/assets/7779868c3d88117de8e9e8342d4c4224d8d0209b.png'
  };
})();
