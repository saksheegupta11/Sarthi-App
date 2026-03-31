import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  GraduationCap,
  MapPin,
  Search,
  Star,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  useGetAllColleges,
  useGetSavedColleges,
  useSaveCollege,
  useUnsaveCollege,
} from "../hooks/useQueries";

// Augmented static data to supplement backend
const STATIC_COLLEGES = [
  {
    name: "Indian Institute of Technology (IIT) Bombay",
    location: "Mumbai, Maharashtra",
    type: "Government",
    courses: ["B.Tech", "M.Tech", "PhD", "MBA"],
    eligibility: "JEE Advanced",
    link: "https://acad.iitb.ac.in",
    rating: 4.8,
  },
  {
    name: "Birla Institute of Technology and Science (BITS) Pilani",
    location: "Pilani, Rajasthan",
    type: "Private",
    courses: ["B.E", "M.E", "MBA", "M.Sc"],
    eligibility: "BITSAT",
    link: "https://www.bits-pilani.ac.in",
    rating: 4.7,
  },
  {
    name: "National Institute of Technology (NIT) Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    type: "Government",
    courses: ["B.Tech", "M.Tech", "MCA", "MBA"],
    eligibility: "JEE Main",
    link: "https://www.nitt.edu",
    rating: 4.6,
  },
  {
    name: "Vellore Institute of Technology (VIT)",
    location: "Vellore, Tamil Nadu",
    type: "Private",
    courses: ["B.Tech", "M.Tech", "MCA", "MBA"],
    eligibility: "VITEEE",
    link: "https://vit.ac.in",
    rating: 4.4,
  },
  {
    name: "Delhi Technological University (DTU)",
    location: "New Delhi",
    type: "Government",
    courses: ["B.Tech", "M.Tech", "MBA", "Design"],
    eligibility: "JEE Main",
    link: "https://www.dtu.ac.in",
    rating: 4.5,
  },
  {
    name: "Indian Institute of Science (IISc) Bangalore",
    location: "Bangalore, Karnataka",
    type: "Government",
    courses: ["B.Sc", "M.Sc", "PhD", "M.Tech"],
    eligibility: "JEE Advanced / NEET / KVPY",
    link: "https://iisc.ac.in",
    rating: 4.9,
  },
  {
    name: "Anna University",
    location: "Chennai, Tamil Nadu",
    type: "Government",
    courses: ["B.E", "B.Tech", "M.E", "MBA"],
    eligibility: "TNEA / Merit-based",
    link: "https://www.annauniv.edu",
    rating: 4.3,
  },
  {
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    type: "Government",
    courses: ["B.E", "B.Tech", "M.E", "Arts", "Science"],
    eligibility: "WBJEE",
    link: "http://www.jaduniv.edu.in",
    rating: 4.5,
  },
];

export default function CollegeFinder() {
  const { data: backendColleges, isLoading } = useGetAllColleges();
  const { data: savedNames = [] } = useGetSavedColleges();
  const saveCollege = useSaveCollege();
  const unsaveCollege = useUnsaveCollege();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Government" | "Private">("All");
  const [savingName, setSavingName] = useState<string | null>(null);

  // Merge backend + static, deduplicate by name
  const allColleges = React.useMemo(() => {
    const backendNames = new Set((backendColleges || []).map((c) => c.name));
    const staticFiltered = STATIC_COLLEGES.filter(
      (c) => !backendNames.has(c.name)
    );
    return [
      ...(backendColleges || []).map((c) => ({
        ...c,
        type: c.type || ("Government" as const),
      })),
      ...staticFiltered,
    ];
  }, [backendColleges]);

  const filtered = allColleges.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.courses.some((course) =>
        course.toLowerCase().includes(search.toLowerCase())
      );
    const matchFilter = filter === "All" || c.type === filter;
    return matchSearch && matchFilter;
  });

  const handleSave = async (name: string) => {
    const isSaved = savedNames.includes(name);
    setSavingName(name);
    try {
      if (isSaved) {
        await unsaveCollege.mutateAsync(name);
        toast.success("College removed from collections");
      } else {
        await saveCollege.mutateAsync(name);
        toast.success("College saved to your collection!");
      }
    } catch {
      toast.error("Failed to update collection. Please try again.");
    } finally {
      setSavingName(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
        {/* Header */}
        <div className="rounded-2xl overflow-hidden mb-6 shadow-card relative h-40">
          <div className="absolute inset-0 bg-teal gradient-hero opacity-90" />
          <div className="absolute inset-0 flex items-center px-8">
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-inner">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
                  <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                    Future Pathways
                  </span>
                </div>
                <h1 className="font-heading text-3xl font-bold text-white tracking-tight">
                  College Finder
                </h1>
                <p className="text-white/75 text-sm max-w-md">
                  Explore top universities and find the perfect environment for
                  your higher education.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-teal transition-colors" />
            <Input
              placeholder="Search by name, location, or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 border-border bg-card/50 backdrop-blur-sm focus:ring-teal/20 focus:border-teal transition-all"
            />
          </div>
          <div className="flex p-1 bg-muted rounded-xl gap-1">
            {(["All", "Government", "Private"] as const).map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  filter === f
                    ? "bg-background text-foreground shadow-sm scale-100"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-medium text-muted-foreground">
            Found{" "}
            <span className="text-foreground font-bold">{filtered.length}</span>{" "}
            institution{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Cards */}
        {isLoading ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-2 animate-pulse">
              <div className="h-2 w-2 rounded-full bg-teal" />
              <p className="text-sm font-medium text-muted-foreground">
                Connecting to education databases and fetching latest institution records...
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {["c1", "c2", "c3", "c4"].map((k) => (
                <Skeleton key={k} className="h-64 rounded-2xl shadow-sm" />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((college) => {
              const isSaved = savedNames.includes(college.name);
              const isSaving = savingName === college.name;
              return (
                <div
                  key={college.name}
                  className="group bg-card rounded-2xl border border-border/60 shadow-sm hover:shadow-xl hover:border-teal/30 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="p-6 pb-0 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <Badge
                        variant="secondary"
                        className={
                          college.type === "Government"
                            ? "bg-teal/10 text-teal border-teal/20 px-2.5 py-0.5 rounded-full"
                            : "bg-amber/10 text-amber-dark border-amber/20 px-2.5 py-0.5 rounded-full"
                        }
                      >
                        {college.type}
                      </Badge>
                      <button
                        type="button"
                        onClick={() => handleSave(college.name)}
                        disabled={isSaving}
                        className="h-9 w-9 flex items-center justify-center rounded-full bg-muted/50 hover:bg-amber/10 text-muted-foreground hover:text-amber transition-all group-hover:scale-110 active:scale-95"
                        title={isSaved ? "Saved" : "Save to collection"}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="h-5 w-5 text-amber" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-foreground mb-1 group-hover:text-teal transition-colors">
                      {college.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
                      <MapPin className="h-3.5 w-3.5" />
                      {college.location}
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        Top Courses
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {college.courses.map((course) => (
                          <span
                            key={course}
                            className="bg-muted px-2 py-0.5 rounded text-[11px] font-medium text-foreground/80 border border-border/40"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-3 border-t border-border/40">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber fill-amber" />
                        <span className="text-sm font-bold text-foreground">
                          {college.rating || "N/A"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Rating
                        </span>
                      </div>
                      <div className="text-[11px] text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                        <span className="font-semibold text-foreground">
                          Entry:
                        </span>{" "}
                        {college.eligibility}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <a
                      href={college.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl gradient-teal text-white text-sm font-bold shadow-teal hover:opacity-90 active:scale-[0.98] transition-all"
                    >
                      Visit Website
                      <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filtered.length === 0 && !isLoading && (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border mt-8">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-muted-foreground opacity-30" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">
              No institutions found
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              We couldn't find any colleges matching "{search}". Try searching
              for a course or city instead.
            </p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
