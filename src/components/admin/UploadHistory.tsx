
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, FileText } from "lucide-react";

interface UploadRecord {
  filename: string;
  timestamp: number;
  recordCount: number;
  fileType: string;
}

export const UploadHistory = () => {
  const [history, setHistory] = useState<UploadRecord[]>([]);

  useEffect(() => {
    // Load upload history from localStorage
    const storedHistory = localStorage.getItem("uploadHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Upload History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filename</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate max-w-[150px]">{record.filename}</span>
                  </TableCell>
                  <TableCell>{formatDate(record.timestamp)}</TableCell>
                  <TableCell>{record.recordCount}</TableCell>
                  <TableCell>{record.fileType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <p>No upload history available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
