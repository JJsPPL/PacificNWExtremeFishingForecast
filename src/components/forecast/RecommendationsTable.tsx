
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
          <TableHead>Water Conditions</TableHead>
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
            <TableCell>
              {rec.waterConditions ? (
                <div>
                  {rec.waterConditions}
                  {rec.bestTime && (
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className="font-medium">Best time: </span>{rec.bestTime}
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-muted-foreground">No data</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
