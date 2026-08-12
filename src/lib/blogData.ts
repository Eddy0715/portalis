export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  author: {
    name: string;
    image: string;
  };
  publishedAt: string;
  content: string; // HTML formatted string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "dubai-authority-approvals",
    title: "Demystifying Dubai Authority Approvals for Commercial Fit-Outs",
    excerpt: "Navigating regulatory approvals in Dubai can be complex. Learn how to secure permits from Dubai Municipality, Civil Defense, DEWA, and developer NOCs smoothly.",
    image: "/assets/blog_dubai_approvals.png",
    category: "Fit-Out & Compliance",
    author: {
      name: "Tariq Al-Mansoori",
      image: "/assets/extracted_img_p7_1_375.jpeg", // Using existing placeholder asset
    },
    publishedAt: "August 1, 2026",
    content: `
      <p>Starting a commercial fit-out project in Dubai is an exciting venture, but it comes with a strict regulatory landscape. To ensure your retail space, office, or restaurant opens on time and without costly fines, navigating Dubai's authority approvals is key.</p>
      
      <h2>1. Dubai Municipality (DM) approvals</h2>
      <p>Dubai Municipality oversees all general building and fit-out standards. Before starting any physical construction, your contractor must submit detailed architectural and MEP (Mechanical, Electrical, Plumbing) drawings. These drawings must prove that the layout aligns with public safety and space requirements.</p>
      
      <h2>2. Dubai Civil Defense (DCD) clearance</h2>
      <p>Safety is paramount. The DCD reviews fire safety plans, sprinkler layouts, smoke detectors, and emergency exit routes. This clearance is mandatory before civil works can begin, and your fire suppression systems must be installed by a DCD-approved specialist.</p>

      <blockquote>
        "An elegant interior is only as good as the safety compliance guarding it. Never cut corners on Civil Defense guidelines."
      </blockquote>

      <h2>3. DEWA (Dubai Electricity & Water Authority) NOC</h2>
      <p>Whether you need to install custom cooling systems, commercial kitchen equipment, or high-power lighting displays, securing a DEWA NOC (No Objection Certificate) for load connection is critical. An audit of electrical schematics must be completed to ensure your demands match the building's allocated load capacity.</p>

      <h2>4. Developer NOCs (Emaar, Nakheel, DDA)</h2>
      <p>Depending on the location of your property, you will need approval from the master developer. Developers like Emaar or Nakheel, or free-zone authorities like the Dubai Development Authority (DDA), have strict guidelines regarding building aesthetics, delivery timings, and contractor credentials.</p>
    `
  },
  {
    slug: "luxury-restobar-lighting",
    title: "The Art of Lighting: Designing Ambience in Luxury Restobars",
    excerpt: "Discover how layered lighting, color temperature controls, and custom architectural fixtures create an immersive and premium hospitality experience.",
    image: "/assets/blog_restobar_lighting.png",
    category: "Hospitality Design",
    author: {
      name: "Elena Rostova",
      image: "/assets/extracted_img_p23_1_203.jpeg",
    },
    publishedAt: "July 24, 2026",
    content: `
      <p>Ambience is the invisible element that defines the success of a restobar. While cuisine and service are critical, it is lighting that shapes how guests feel the moment they cross the threshold. Let's look at the fundamentals of hospitality lighting design.</p>
      
      <h2>1. Layered lighting strategy</h2>
      <p>A premium restobar relies on three distinct layers of lighting: ambient, task, and accent. Ambient lighting establishes the baseline mood. Task lighting ensures staff and guests can navigate the menu safely. Accent lighting draws attention to focal points like bar shelves, bespoke metal work, or art installations.</p>
      
      <h2>2. Master the color temperature</h2>
      <p>For high-end nightlife and dining, warm lighting is essential. Keeping color temperatures between 1800K and 2400K creates a cozy, relaxing environment. This range flatters skin tones, makes dishes look more appetizing, and encourages guests to linger longer.</p>

      <blockquote>
        "Lighting doesn't just illuminate a space; it directs human emotion and conversation."
      </blockquote>

      <h2>3. Smart dimming and scene control</h2>
      <p>A restaurant's light requirements change throughout the day. High-end spaces implement smart control systems (such as Lutron or Crestron) to transition smoothly from bright lunch settings to intimate dinner modes and high-energy midnight club scenes.</p>
    `
  },
  {
    slug: "minimalist-luxury-interiors",
    title: "Minimalist Luxury: Balancing Elegance and Functional Space",
    excerpt: "How to achieve a high-end minimalist interior without sacrificing warmth, utility, or comfort. Explore our design principles for modern luxury living.",
    image: "/assets/blog_minimalist_luxury.png",
    category: "Design Trends",
    author: {
      name: "Sarah Jenkins",
      image: "/assets/extracted_img_p20_1_182.jpeg",
    },
    publishedAt: "July 15, 2026",
    content: `
      <p>Minimalism in interior design is often misunderstood as cold, empty spaces. In reality, modern luxury minimalism is about restraint, high-spec materials, and careful space planning. It is the design philosophy of 'less is more, but better.'</p>
      
      <h2>1. High-spec material selection</h2>
      <p>When there are fewer objects in a room, the quality of each element becomes crucial. Luxury minimalism highlights the natural beauty of materials — polished concrete, Calacatta marble, brushed brass, and natural oak veneers.</p>
      
      <h2>2. Integrated and hidden storage</h2>
      <p>Clutter is the enemy of minimalist beauty. We design bespoke hidden storage, flush-to-wall cabinetry, and integrated shelving to ensure everyday items are concealed, keeping lines clean and views unobstructed.</p>

      <blockquote>
        "Simplicity is the ultimate sophistication. Every detail in a minimalist space must serve a functional or aesthetic purpose."
      </blockquote>

      <h2>3. Playing with textures</h2>
      <p>To prevent a clean space from feeling sterile, layering different textures is key. Combining soft linen curtains, bouclé seating, and polished plaster walls adds depth, warmth, and tactile interest.</p>
    `
  },
  {
    slug: "biophilic-corporate-offices",
    title: "Biophilic Design: Creating Healthy and Productive Workspaces",
    excerpt: "Integrating nature into office spaces is proven to improve productivity and well-being. Discover simple biophilic principles for your corporate layout.",
    image: "/assets/blog_biophilic_office.png",
    category: "Corporate Office",
    author: {
      name: "Tariq Al-Mansoori",
      image: "/assets/extracted_img_p7_1_375.jpeg",
    },
    publishedAt: "July 2, 2026",
    content: `
      <p>Modern corporate life is increasingly spent indoors, which can negatively affect employee wellness and productivity. Biophilic design bridges this gap by bringing natural elements into the workspace to create a happier, healthier workplace.</p>
      
      <h2>1. Maximizing daylight access</h2>
      <p>Natural light regulates our circadian rhythm, improving mood and sleep quality. We structure office layouts with glass partitions and low-profile furniture to ensure daylight reaches deep into the floor plate.</p>
      
      <h2>2. Incorporating living greenery</h2>
      <p>Plants do more than just look pretty. Indoor plants, living moss walls, and hanging planters improve indoor air quality by absorbing carbon dioxide and releasing oxygen, while lowering stress levels.</p>

      <h2>3. Utilizing organic textures and materials</h2>
      <p>Incorporating natural materials like timber, stone, and wool into desks, flooring, and wall paneling brings a grounded, natural feel into the workspace, enhancing psychological comfort.</p>
    `
  },
  {
    slug: "bespoke-joinery-craftsmanship",
    title: "Bespoke Joinery: The Hallmark of Elite Spatial Craftsmanship",
    excerpt: "Explore how custom woodwork, veneer paneling, and tailored furniture pieces elevate premium interiors above standard off-the-shelf options.",
    image: "/assets/blog_bespoke_joinery.png",
    category: "Joinery & Woodwork",
    author: {
      name: "Sarah Jenkins",
      image: "/assets/extracted_img_p20_1_182.jpeg",
    },
    publishedAt: "June 18, 2026",
    content: `
      <p>High-end interior design relies on custom fittings that match the architectural lines of a property. Bespoke joinery is the difference between an average layout and an elite space tailored to your lifestyle. Here is why bespoke joinery matters.</p>
      
      <h2>1. Exact dimensional control</h2>
      <p>Off-the-shelf furniture rarely fits perfectly, leaving awkward gaps. Bespoke joinery is measured to the millimeter, ensuring wardrobe towers, display cases, and wall panels flow seamlessly into corners and columns.</p>
      
      <h2>2. Custom wood grain and veneer matching</h2>
      <p>Elite joinery allows designers to specify matching veneer patterns (such as book-matching) across doors, tables, and cabinets, creating a level of visual continuity that is impossible with pre-fabricated pieces.</p>

      <blockquote>
        "Custom joinery is architectural sculpture. It merges storage, structure, and material beauty into one seamless entity."
      </blockquote>

      <h2>3. Durability and craftsmanship</h2>
      <p>Crafted in specialized manufacturing facilities with premium timber, heavy-duty slides, and custom finishes, bespoke joinery is built to last, maintaining its structure and beauty for decades.</p>
    `
  }
];
