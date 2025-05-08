
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FishingRecommendation } from "@/lib/types/fishingTypes";

interface RecommendationsTableProps {
  recommendations: FishingRecommendation[];
}

export const RecommendationsTable = ({ recommendations }: RecommendationsTableProps) => {
  if (recommendations.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        Try adjusting your search or filter criteria
      </p>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Species</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Tactics</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recommendations.map((rec, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{rec.species}</TableCell>
            <TableCell>{rec.location}</TableCell>
            <TableCell>
              {rec.tactics}
              {rec.bait && (
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="font-medium">Recommended bait: </span>{rec.bait}
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
